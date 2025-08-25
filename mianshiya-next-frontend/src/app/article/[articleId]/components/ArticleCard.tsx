"use client";
import { Card, Tag, Button, message, Avatar, Divider } from "antd";
import { 
  EyeOutlined, 
  LikeOutlined, 
  StarOutlined, 
  LikeFilled, 
  StarFilled,
  CalendarOutlined,
  UserOutlined
} from "@ant-design/icons";
import { doThumbUsingPost } from "@/api/articleThumbController";
import { doArticleFavourUsingPost } from "@/api/articleFavourController";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useState } from "react";
import dayjs from "dayjs";
import MdViewer from "@/components/MdViewer";
import "./ArticleCard.css";

interface Props {
  article: API.ArticleVO;
}

/**
 * 文章详情卡片
 * @param props
 * @constructor
 */
const ArticleCard = (props: Props) => {
  const { article } = props;
  const loginUser = useSelector((state: RootState) => state.loginUser);
  
  const [hasThumb, setHasThumb] = useState(article.hasThumb || false);
  const [hasFavour, setHasFavour] = useState(article.hasFavour || false);
  const [thumbNum, setThumbNum] = useState(article.thumbNum || 0);
  const [favourNum, setFavourNum] = useState(article.favourNum || 0);
  const [thumbLoading, setThumbLoading] = useState(false);
  const [favourLoading, setFavourLoading] = useState(false);

  /**
   * 点赞
   */
  const doThumb = async () => {
    if (!loginUser.id) {
      message.warning("请先登录");
      return;
    }
    
    setThumbLoading(true);
    try {
      const res = await doThumbUsingPost({
        articleId: article.id,
      });
      if (res.data !== undefined && res.data !== null) {
        const change = res.data as number;
        setHasThumb(!hasThumb);
        setThumbNum(thumbNum + change);
        message.success(change > 0 ? "点赞成功" : "取消点赞成功");
      }
    } catch (e: any) {
      message.error("操作失败：" + e.message);
    }
    setThumbLoading(false);
  };

  /**
   * 收藏
   */
  const doFavour = async () => {
    if (!loginUser.id) {
      message.warning("请先登录");
      return;
    }
    
    setFavourLoading(true);
    try {
      const res = await doArticleFavourUsingPost({
        articleId: article.id,
      });
      if (res.data !== undefined && res.data !== null) {
        const change = res.data as number;
        setHasFavour(!hasFavour);
        setFavourNum(favourNum + change);
        message.success(change > 0 ? "收藏成功" : "取消收藏成功");
      }
    } catch (e: any) {
      message.error("操作失败：" + e.message);
    }
    setFavourLoading(false);
  };

  return (
    <div className="article-detail-page">
      {/* 文章头部信息 */}
      <div className="article-header">
        {/* 分类标签 */}
        {article.category && (
          <Tag className="category-tag" color="blue">
            {article.category}
          </Tag>
        )}
        
        {/* 文章标题 */}
        <h1 className="article-title">{article.title}</h1>
        
        {/* 作者信息 */}
        <div className="author-section">
          <div className="author-main">
            <Avatar 
              src={article.user?.userAvatar} 
              icon={<UserOutlined />}
              size={40}
              className="author-avatar"
            />
            <div className="author-info">
              <div className="author-name">{article.user?.userName || "匿名用户"}</div>
              <div className="author-meta">
                <span className="publish-time">
                  {dayjs(article.createTime).format("YYYY年MM月DD日 HH:mm")}
                </span>
                <span className="view-count">
                  <EyeOutlined /> {article.viewNum || 0} 人阅读
                </span>
              </div>
            </div>
          </div>
          
          {/* 快捷操作 */}
          <div className="quick-actions">
            <Button
              type={hasThumb ? "primary" : "default"}
              icon={hasThumb ? <LikeFilled /> : <LikeOutlined />}
              loading={thumbLoading}
              onClick={doThumb}
              size="middle"
              className="action-btn"
            >
              {hasThumb ? "已赞同" : "赞同"} {thumbNum}
            </Button>
            
            <Button
              type={hasFavour ? "primary" : "default"}
              icon={hasFavour ? <StarFilled /> : <StarOutlined />}
              loading={favourLoading}
              onClick={doFavour}
              size="middle"
              className="action-btn"
            >
              {hasFavour ? "已收藏" : "收藏"} {favourNum}
            </Button>
          </div>
        </div>
        
        {/* 文章标签 */}
        {article.tagList && article.tagList.length > 0 && (
          <div className="article-tags">
            {article.tagList.map((tag) => (
              <Tag key={tag} className="tag-item">
                {tag}
              </Tag>
            ))}
          </div>
        )}
        
        <Divider className="header-divider" />
      </div>
      
      {/* 文章正文 */}
      <div className="article-body">
        <div className="article-content">
          <MdViewer value={article.content || ""} />
        </div>
      </div>
    
    </div>
  );
};

export default ArticleCard;
