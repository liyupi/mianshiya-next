"use client";
import { List, Empty } from "antd";
import ArticleCard from "@/components/ArticleCard";
import "./index.css";

interface Props {
  articleList: API.ArticleVO[];
  loading?: boolean;
}

/**
 * 文章列表组件
 * @param articleList 文章列表
 * @param loading 加载状态
 * @constructor
 */
const ArticleList: React.FC<Props> = ({ articleList, loading = false }) => {
  if (!loading && (!articleList || articleList.length === 0)) {
    return (
      <div className="article-list-empty">
        <Empty description="暂无文章" />
      </div>
    );
  }

  return (
    <div className="article-list">
      <List
        loading={loading}
        dataSource={articleList}
        renderItem={(article) => (
          <List.Item>
            <ArticleCard article={article} />
          </List.Item>
        )}
        pagination={false}
      />
    </div>
  );
};

export default ArticleList;
