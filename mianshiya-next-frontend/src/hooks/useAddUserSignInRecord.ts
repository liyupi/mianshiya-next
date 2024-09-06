import { useEffect, useState } from "react";
import { message } from "antd";
import { addUserSignInUsingPost } from "@/api/userController";

/**
 * 添加用户刷题签到记录钩子
 * @param props
 * @constructor
 */
const useAddUserSignInRecord = () => {
  // 签到状态
  const [loading, setLoading] = useState<boolean>(true);

  // 请求后端执行签到
  const doFetch = async () => {
    setLoading(true);
    try {
      await addUserSignInUsingPost({});
    } catch (e) {
      message.error("获取刷题签到记录失败，" + e.message);
    }
    setLoading(false);
  };

  // 保证只会调用一次
  useEffect(() => {
    doFetch();
  }, []);

  return { loading };
};

export default useAddUserSignInRecord;
