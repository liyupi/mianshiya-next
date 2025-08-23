"use client";
import { Card, Tag, Space, Typography, Avatar } from "antd";
import { EyeOutlined, LikeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import "./index.css";

const { Text, Title } = Typography;

interface Props {
  article: API.ArticleVO;
}

/**
 * 文章卡片组件
 * @param article 文章信息
 * @constructor
 */
const ArticleCard: React.FC<Props> = ({ article }) => {
  const {
    id,
    title,
    summary,
    content,
    tagList = [],
    createTime,
    user,
    favourNum = 0,
    thumbNum = 0,
    viewCount = 0,
    category,
  } = article;

  // 格式化时间
  const formatTime = (time: string) => {
    try {
      return formatDistanceToNow(new Date(time), { addSuffix: true, locale: zhCN });
    } catch (e) {
      return "未知时间";
    }
  };

  // 截取摘要
  const getSummary = () => {
    if (summary) {
      return summary.length > 100 ? summary.substring(0, 100) + "..." : summary;
    }
    if (content) {
      const plainText = content.replace(/[#*`]/g, "").replace(/\n/g, " ");
      return plainText.length > 100 ? plainText.substring(0, 100) + "..." : plainText;
    }
    return "暂无摘要";
  };

  return (
    <Card
      className="article-card"
      hoverable
      actions={[
        <Space key="view">
          <EyeOutlined />
          <Text type="secondary">{viewCount}</Text>
        </Space>,
        <Space key="like">
          <LikeOutlined />
          <Text type="secondary">{thumbNum}</Text>
        </Space>,
        <Space key="favour">
          <StarOutlined />
          <Text type="secondary">{favourNum}</Text>
        </Space>,
      ]}
    >
      <div className="article-card-header">
        <div className="article-meta">
          <Space>
            <Avatar 
              size="small" 
              src={user?.userAvatar} 
              icon={<UserOutlined />}
            />
            <Text type="secondary">{user?.userName || "匿名用户"}</Text>
            <Text type="secondary">·</Text>
            <Text type="secondary">{formatTime(createTime)}</Text>
            {category && (
              <>
                <Text type="secondary">·</Text>
                <Tag color="blue">{category}</Tag>
              </>
            )}
          </Space>
        </div>
      </div>

      <div className="article-card-content">
        <Link href={`/article/${id}`}>
          <Title level={4} className="article-title">
            {title}
          </Title>
        </Link>
        <Text className="article-summary" type="secondary">
          {getSummary()}
        </Text>
      </div>

      {tagList && tagList.length > 0 && (
        <div className="article-tags">
          <Space wrap>
            {tagList.map((tag, index) => (
              <Tag key={index} color="green">
                {tag}
              </Tag>
            ))}
          </Space>
        </div>
      )}
    </Card>
  );
};

export default ArticleCard;
