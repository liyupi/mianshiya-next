"use client";
import { listArticleVoByPageUsingPost } from "@/api/articleController";
import ArticleList from "@/components/ArticleList";
import { message } from "antd";
import { useEffect, useState } from "react";
import "./index.css";

/**
 * 文章列表页面
 * @constructor
 */
export default function ArticlesPage() {
  const initSearchParams = {
    current: 1,
    pageSize: 12,
    sortField: "createTime",
    sortOrder: "descend",
  };

  const [searchParams, setSearchParams] = useState<API.ArticleQueryRequest>({
    ...initSearchParams,
  });
  const [articleList, setArticleList] = useState<API.ArticleVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * 加载数据
   */
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listArticleVoByPageUsingPost(searchParams);
      const data = res.data as API.PageArticleVO;
      setArticleList(data?.records ?? []);
      setTotal(data?.total ?? 0);
    } catch (e: any) {
      message.error("获取文章列表失败，" + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div id="articlesPage" className="max-width-content">
      <ArticleList 
        articleList={articleList} 
        loading={loading}
        total={total}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}
