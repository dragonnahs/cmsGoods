import MyForm from './components/MyForm';

export default function Login() {
  // 通过userPathname能在client component组件中获取路由
  // 通过useSelectedLayoutSegments，在client component组件中获取layout下面的所有路由片段，
  // 只能在layout组件中获取，page中无法获取
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      登录
      <MyForm />
    </div>
  );
}
