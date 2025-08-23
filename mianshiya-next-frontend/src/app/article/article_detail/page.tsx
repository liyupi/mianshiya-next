"use server";
import { getMockArticleById } from "@/mock/articleData";
import ArticleDetail from "@/components/ArticleDetail";
import "./index.css";

/**
 * 文章详情页面
 * @constructor
 */
export default async function ArticleDetailPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // 从查询参数中获取文章ID
  const { id } = searchParams;

  // 使用假数据获取文章详情
  const article = id ? getMockArticleById(parseInt(id)) : undefined;

  // 错误处理
  if (!article) {
    return <div>文章不存在，请检查链接</div>;
  }

  return (
    <div id="articleDetailPage" className="max-width-content">
      <ArticleDetail article={article} />
    </div>
  );
}
