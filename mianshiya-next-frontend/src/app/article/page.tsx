"use server";
import Title from "antd/es/typography/Title";
import { message } from "antd";
import { searchArticleVOByPageUsingPost } from "@/api/articleController";
import ArticleTable from "@/components/ArticleTable";
import "./index.css";

/**
 * 文章列表页面
 * @constructor
 */
export default async function ArticlePage({ searchParams }) {
  // 获取 url 的查询参数
  const { q: searchText, category } = searchParams;
  // 文章列表和总数
  let articleList = [];
  let total = 0;

  try {
    const res = await searchArticleVOByPageUsingPost({
      searchText,
      category,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    articleList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    message.error("获取文章列表失败，" + e.message);
  }

  return (
    <div id="articlePage" className="max-width-content">
      <Title level={3}>文章大全</Title>
      <ArticleTable
        defaultArticleList={articleList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
          category,
        }}
      />
    </div>
  );
}
