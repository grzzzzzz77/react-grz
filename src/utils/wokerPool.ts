type TaskPayload = any;
type TaskResult = any;

interface Task {
  payload: TaskPayload;
  resolve: (data: TaskResult) => void;
  reject: (err: any) => void;
  timeoutId?: ReturnType<typeof setTimeout>;
}

// 扩展 Worker 类型，添加 __currentTask__ 属性
interface WorkerWithTask extends Worker {
  __currentTask__?: Task;
}

export class WorkerPool {
  private poolSize: number;
  private workers: WorkerWithTask[] = []; // Worker 实例数组
  private busyWorkers: Set<number> = new Set(); // 忙碌 Worker 的索引集合
  private taskQueue: Task[] = []; // 任务等待队列

  /**
   * 创建 Worker 池
   * @param workerUrl 使用 Vite 的 `import workerUrl from './worker.ts?url'` 导入的 URL
   * @param poolSize 池大小，默认 4
   */
  constructor(workerUrl: string, poolSize = 4) {
    this.poolSize = poolSize;
    // 循环创建指定数量的 Worker
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerUrl, {
        type: "module",
      }) as WorkerWithTask;
      // this.handleMessage(i) 被立即调用
      // 这个调用返回一个新函数
      // 这个新函数被赋值给 worker.onmessage
      worker.onmessage = this.handleMessage(i); // 绑定消息处理器（Worker 完成任务时触发）
      worker.onerror = this.handleError(i); // 绑定错误处理器（Worker 发生错误时触发）
      this.workers.push(worker); // 将 Worker 添加到数组
    }
  }

  //handleMessage = (index: number) => {
  // 第一层：接收 index，返回另一个函数
  //   return (event: MessageEvent) => {
  // 第二层：这才是真正的事件处理器
  // index 通过闭包被"记住"了
  //   };
  // };
  private handleMessage = (index: number) => (event: MessageEvent) => {
    // 获取该 Worker 当前正在处理的任务
    const task = this.workers[index].__currentTask__;

    if (!task) return; // 任务可能已超时被清理

    if (task.timeoutId) clearTimeout(task.timeoutId);
    task.resolve(event.data);
    delete this.workers[index].__currentTask__;
    // 将该 Worker 从忙碌集合中移除
    this.busyWorkers.delete(index);
    this.runNextTask();
  };

  private handleError = (index: number) => (err: ErrorEvent) => {
    const task = this.workers[index].__currentTask__;
    if (!task) return; // 任务可能已超时被清理

    if (task.timeoutId) clearTimeout(task.timeoutId);
    task.reject(err);
    delete this.workers[index].__currentTask__;
    this.busyWorkers.delete(index);
    this.runNextTask();
  };

  private runNextTask() {
    if (this.taskQueue.length === 0) return;

    // 找到第一个空闲的 Worker 索引
    const idleIndex = this.workers.findIndex(
      (_, i) => !this.busyWorkers.has(i)
    );
    // 如果所有 Worker 都忙，退出等待
    if (idleIndex === -1) return;

    // 从队列头部取出一个任务
    const task = this.taskQueue.shift()!;
    // 获取空闲的 Worker
    const worker = this.workers[idleIndex];
    // 将任务绑定到 Worker
    worker.__currentTask__ = task;
    // 标记该 Worker 为忙碌
    this.busyWorkers.add(idleIndex);

    task.timeoutId = setTimeout(() => {
      task.reject(new Error("Worker task timeout"));
      delete worker.__currentTask__; // 清理任务引用，防止后续回调误操作
      this.busyWorkers.delete(idleIndex);
      this.runNextTask();
    }, 10000); // 10秒超时

    worker.postMessage(task.payload);
  }

  public run(payload: TaskPayload): Promise<TaskResult> {
    return new Promise((resolve, reject) => {
      // 创建任务对象，包含数据和 Promise 回调
      const task: Task = { payload, resolve, reject };
      // 将任务加入队列
      this.taskQueue.push(task);
      // 尝试立即执行
      this.runNextTask();
    });
  }

  public destroy() {
    this.workers.forEach((w) => w.terminate());
    this.workers = [];
    this.taskQueue = [];
    this.busyWorkers.clear();
  }
}
