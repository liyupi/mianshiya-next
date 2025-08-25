import { getArticleVoByIdUsingGet } from "@/api/articleController";
import ArticleCard from "./components/ArticleCard";
import { message } from "antd";
import "./index.css";

/**
 * 文章详情页面
 * @param params
 * @constructor
 */
export default async function ArticlePage({ params }: { params: { articleId: string } }) {
  const { articleId } = params;
  let article: API.ArticleVO = {};

  try {
    const res = await getArticleVoByIdUsingGet({
      id: Number(articleId),
    });
    article = res.data || {};
  } catch (e: any) {
    console.error("获取文章详情失败：", e.message);
  }

  // 文章不存在
  if (!article.id) {
    return (
      <div id="articlePage" className="max-width-content">
        <div className="article-not-found">
          <h2>文章不存在</h2>
          <p>您访问的文章可能已被删除或不存在</p>
        </div>
      </div>
    );
  }

  // 构建页面元数据
  const title = article.title || "文章详情";
  const description = article.summary || article.content?.substring(0, 200);

  return (
    <div id="articlePage" className="max-width-content">
      <div className="article-content">
        <ArticleCard article={article} />
      </div>
    </div>
  );
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { articleId: string } }) {
  const { articleId } = params;
  
  try {
    const res = await getArticleVoByIdUsingGet({
      id: Number(articleId),
    });
    const article = res.data;
    
    return {
      title: article?.title || "文章详情",
      description: article?.summary || article?.content?.substring(0, 200),
    };
  } catch (e) {
    return {
      title: "文章详情",
      description: "面试刷题平台文章详情页面",
    };
  }
}
