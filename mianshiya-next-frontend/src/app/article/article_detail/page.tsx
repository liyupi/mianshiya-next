"use server";
import { message } from "antd";
import { getArticleVoByIdUsingGet } from "@/api/articleController";
import ArticleDetail from "@/components/ArticleDetail";
import "./index.css";

/**
 * 文章详情页面
 * @constructor
 */
export default async function ArticleDetailPage({ params }) {
  const { articleId } = params;

  // 获取文章详情
  let article = undefined;
  try {
    const res = await getArticleVoByIdUsingGet({
      id: articleId,
    });
    article = res.data;
  } catch (e) {
    message.error("获取文章详情失败，" + e.message);
  }

  // 错误处理
  if (!article) {
    return <div>获取文章详情失败，请刷新重试</div>;
  }

  return (
    <div id="articleDetailPage" className="max-width-content">
      <ArticleDetail article={article} />
    </div>
  );
}
