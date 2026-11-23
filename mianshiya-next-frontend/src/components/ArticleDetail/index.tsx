"use client";
import { Card, Tag, Space, Typography, Avatar, Button, Divider, message } from "antd";
import { 
  EyeOutlined, 
  LikeOutlined, 
  StarOutlined, 
  UserOutlined,
  LikeFilled,
  StarFilled
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
// 移除后端接口调用，使用假数据
import MdViewer from "@/components/MdViewer";
import "./index.css";

const { Text, Title, Paragraph } = Typography;

interface Props {
  article: API.ArticleVO;
}

/**
 * 文章详情组件
 * @param article 文章信息
 * @constructor
 */
const ArticleDetail: React.FC<Props> = ({ article }) => {
  const {
    id,
    title,
    content,
    tagList = [],
    createTime,
    updateTime,
    user,
    favourNum = 0,
    thumbNum = 0,
    viewCount = 0,
    category,
    hasFavour = false,
    hasThumb = false,
  } = article;

  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [isFavour, setIsFavour] = useState(hasFavour);
  const [isThumb, setIsThumb] = useState(hasThumb);
  const [favourCount, setFavourCount] = useState(favourNum);
  const [thumbCount, setThumbCount] = useState(thumbNum);

  // 格式化时间
  const formatTime = (time: string) => {
    try {
      return formatDistanceToNow(new Date(time), { addSuffix: true, locale: zhCN });
    } catch (e) {
      return "未知时间";
    }
  };

  // 处理收藏
  const handleFavour = async () => {
    if (!loginUser.id) {
      message.warning("请先登录");
      return;
    }

    try {
      if (isFavour) {
        // 模拟取消收藏
        setFavourCount(favourCount - 1);
        setIsFavour(false);
        message.success("取消收藏成功");
      } else {
        // 模拟收藏
        setFavourCount(favourCount + 1);
        setIsFavour(true);
        message.success("收藏成功");
      }
    } catch (e: any) {
      message.error("操作失败，" + e.message);
    }
  };

  // 处理点赞
  const handleThumb = () => {
    if (!loginUser.id) {
      message.warning("请先登录");
      return;
    }

    if (isThumb) {
      setThumbCount(thumbCount - 1);
      setIsThumb(false);
      message.success("取消点赞");
    } else {
      setThumbCount(thumbCount + 1);
      setIsThumb(true);
      message.success("点赞成功");
    }
  };

  return (
    <div className="article-detail">
      <Card>
        {/* 文章头部信息 */}
        <div className="article-detail-header">
          <Title level={2} className="article-detail-title">
            {title}
          </Title>
          
          <div className="article-detail-meta">
            <Space size="large">
              <Space>
                <Avatar 
                  size="small" 
                  src={user?.userAvatar} 
                  icon={<UserOutlined />}
                />
                <Text type="secondary">{user?.userName || "匿名用户"}</Text>
              </Space>
              <Text type="secondary">发布于 {formatTime(createTime)}</Text>
              {updateTime !== createTime && (
                <Text type="secondary">更新于 {formatTime(updateTime)}</Text>
              )}
              {category && (
                <Tag color="blue">{category}</Tag>
              )}
            </Space>
          </div>

          {/* 文章统计信息 */}
          <div className="article-detail-stats">
            <Space size="large">
              <Space>
                <EyeOutlined />
                <Text type="secondary">{viewCount} 次浏览</Text>
              </Space>
              <Space>
                <LikeOutlined />
                <Text type="secondary">{thumbCount} 个点赞</Text>
              </Space>
              <Space>
                <StarOutlined />
                <Text type="secondary">{favourCount} 次收藏</Text>
              </Space>
            </Space>
          </div>

          {/* 操作按钮 */}
          <div className="article-detail-actions">
            <Space>
              <Button
                type={isThumb ? "primary" : "default"}
                icon={isThumb ? <LikeFilled /> : <LikeOutlined />}
                onClick={handleThumb}
              >
                {isThumb ? "已点赞" : "点赞"}
              </Button>
              <Button
                type={isFavour ? "primary" : "default"}
                icon={isFavour ? <StarFilled /> : <StarOutlined />}
                onClick={handleFavour}
              >
                {isFavour ? "已收藏" : "收藏"}
              </Button>
            </Space>
          </div>
        </div>

        <Divider />

        {/* 文章标签 */}
        {tagList && tagList.length > 0 && (
          <div className="article-detail-tags">
            <Space wrap>
              {tagList.map((tag, index) => (
                <Tag key={index} color="green">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>
        )}

        <Divider />

        {/* 文章内容 */}
        <div className="article-detail-content">
          <MdViewer value={content || ""} />
        </div>
      </Card>
    </div>
  );
};

export default ArticleDetail;
