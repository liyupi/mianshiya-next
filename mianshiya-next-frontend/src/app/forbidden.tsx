import { Button, Result } from "antd";

/**
 * 无权限访问的页面
 * @constructor
 */
const Forbidden = () => {
  return (
    <Result
      status={403}
      title="403"
      subTitle="对不起，你无权访问该页面。"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    />
  );
};

export default Forbidden;
