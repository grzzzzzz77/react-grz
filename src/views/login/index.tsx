import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { AuthLayout } from './auth-layout'
import LoginForm from './cpns/LoginForm'


export function Login() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Login</CardTitle>
          <CardDescription>
            请输入您的用户名和密码 <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
          登录即表示您同意我们的{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              服务协议
            </a>{' '}
            和{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              条款
            </a>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
