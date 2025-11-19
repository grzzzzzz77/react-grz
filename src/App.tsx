import { useRef } from "react"
import { getAllCategory } from "./api/demoTest"

function App() {
  const ref = useRef(null)
  const hanldeClick = async ()=>{
    const input:any = ref.current
    try {
      const res = await getAllCategory(input.value)
      if(res.code === 200){
        console.log(res.data)
      }else{
        console.log("失败",res.data)
      }

    } catch (error) {
    }
  }

  return (
    <>
     <div>hello app</div>
     <input ref={ref} type="text" />
     <button onClick={()=>{hanldeClick()}}>点击查询</button>
    </>
  )
}

export default App
