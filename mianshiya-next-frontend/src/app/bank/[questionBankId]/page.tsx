"use server";
import { Avatar, Button, Card, message } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";
import "./index.css";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({ params }) {
  const { questionBankId } = params;
  let bank = undefined;

  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      // 可以自行扩展为分页实现
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    message.error("获取题库列表失败，" + e.message);
  }

  // 错误处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 获取第一道题目，用于 “开始刷题” 按钮跳转
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records ?? []}
        cardTitle={`题目列表（${bank.questionPage?.total || 0}）`}
      />
    </div>
  );
}
