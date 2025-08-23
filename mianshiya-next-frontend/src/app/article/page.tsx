"use server";
import Title from "antd/es/typography/Title";
import { getMockArticles } from "@/mock/articleData";
import ArticleTable from "@/components/ArticleTable";
import "./index.css";

/**
 * 文章列表页面
 * @constructor
 */
export default async function ArticlePage({ searchParams }) {
  // 获取 url 的查询参数
  const { q: searchText, category } = searchParams;
  
  // 使用假数据
  const mockData = getMockArticles({
    searchText,
    category,
    pageSize: 12,
    sortField: "createTime",
    sortOrder: "descend",
  });

  return (
    <div id="articlePage" className="max-width-content">
      <Title level={3}>文章大全</Title>
      <ArticleTable
        defaultArticleList={mockData.records}
        defaultTotal={mockData.total}
        defaultSearchParams={{
          title: searchText,
          category,
        }}
      />
    </div>
  );
}
