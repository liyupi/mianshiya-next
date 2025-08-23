import Title from "antd/es/typography/Title";
import { Divider, Flex } from "antd";
import Link from "next/link";
import { getMockArticles } from "@/mock/articleData";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
import ArticleList from "@/components/ArticleList";
import "./index.css";

// 本页面使用服务端渲染，禁用静态生成
export const dynamic = 'force-dynamic';

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  // 使用假数据
  const mockArticleData = getMockArticles({
    pageSize: 6,
    sortField: "createTime",
    sortOrder: "descend",
  });

  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={[]} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <QuestionList questionList={[]} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新文章</Title>
        <Link href={"/article"}>查看更多</Link>
      </Flex>
      <ArticleList articleList={mockArticleData.records} />
    </div>
  );
}
