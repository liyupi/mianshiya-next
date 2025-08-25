"use client";
import { Card, Input, List, Pagination, Select, Tag, Empty, Button } from "antd";
import { SearchOutlined, EyeOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import "./index.css";

interface Props {
  articleList: API.ArticleVO[];
  loading?: boolean;
  total?: number;
  searchParams?: API.ArticleQueryRequest;
  setSearchParams?: (params: API.ArticleQueryRequest) => void;
  showSearch?: boolean; // 是否显示搜索区域
}

/**
 * 文章列表组件
 * @param props
 * @constructor
 */
const ArticleList = (props: Props) => {
  const { articleList, loading, total = 0, searchParams, setSearchParams, showSearch = true } = props;

  const categoryOptions = [
    { label: "全部", value: "" },
    { label: "技术分享", value: "技术分享" },
    { label: "面试经验", value: "面试经验" },
    { label: "职场生活", value: "职场生活" },
    { label: "学习笔记", value: "学习笔记" },
  ];

  const handleSearch = (value: string) => {
    if (setSearchParams) {
      setSearchParams({
        ...searchParams,
        searchText: value,
        current: 1,
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    if (setSearchParams) {
      setSearchParams({
        ...searchParams,
        category: value,
        current: 1,
      });
    }
  };

  const handlePageChange = (current: number, pageSize: number) => {
    if (setSearchParams) {
      setSearchParams({
        ...searchParams,
        current,
        pageSize,
      });
    }
  };

  return (
    <div className="article-list">
      {/* 搜索和筛选 */}
      {showSearch && (
        <div className="search-section">
        <div className="search-container">
          <div className="search-content">
            <Input.Search
              placeholder="搜索文章标题或内容..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              className="search-input"
            />
            
            <Select
              placeholder="选择分类"
              size="large"
              style={{ width: 140 }}
              options={categoryOptions}
              value={searchParams?.category || ""}
              onChange={handleCategoryChange}
              className="filter-select"
            />
          </div>
        </div>
        </div>
      )}

      {/* 文章列表 */}
      <List
        loading={loading}
        dataSource={articleList}
        renderItem={(article) => (
          <List.Item key={article.id} className="article-item">
            <div className="article-card">
              <div className="article-main">
                {/* 文章内容区域 */}
                <div className="article-content">
                  {/* 分类标签 */}
                  {article.category && (
                    <Tag className="category-tag" color="blue">
                      {article.category}
                    </Tag>
                  )}
                  
                  {/* 文章标题 */}
                  <Link href={`/article/${article.id}`} className="article-title-link">
                    <h3 className="article-title">{article.title}</h3>
                  </Link>
                  
                  {/* 文章摘要 */}
                  <div className="article-summary">
                    {article.summary || article.content?.substring(0, 120) + "..."}
                  </div>
                  
                  {/* 底部信息栏 */}
                  <div className="article-footer">
                    <div className="author-info">
                      <span className="author-name">{article.user?.userName || "匿名用户"}</span>
                      <span className="publish-time">{dayjs(article.createTime).format("MM-DD")}</span>
                      <span className="view-count">
                        <EyeOutlined /> {article.viewNum || 0}
                      </span>
                    </div>
                    
                    <div className="article-stats">
                      <Button type="text" size="small" icon={<LikeOutlined />} className="stat-btn">
                        {article.thumbNum || 0}
                      </Button>
                      <Button type="text" size="small" icon={<StarOutlined />} className="stat-btn">
                        {article.favourNum || 0}
                      </Button>
                      <Button type="text" size="small" className="stat-btn">
                        分享
                      </Button>
                    </div>
                  </div>
                  
                  {/* 标签 */}
                  {article.tagList && article.tagList.length > 0 && (
                    <div className="article-tags">
                      {article.tagList.slice(0, 5).map((tag) => (
                        <Tag key={tag} className="tag-item">
                          {tag}
                        </Tag>
                      ))}
                      {article.tagList.length > 5 && <span className="tag-more">...</span>}
                    </div>
                  )}
                </div>
                
                {/* 右侧封面图 */}
                {article.cover && (
                  <div className="article-cover">
                    <Image
                      src={article.cover}
                      alt={article.title || "文章封面"}
                      width={150}
                      height={100}
                      className="cover-image"
                    />
                  </div>
                )}
              </div>
            </div>
          </List.Item>
        )}
        locale={{
          emptyText: (
            <Empty
              description="暂无文章"
              imageStyle={{ height: 80 }}
            />
          ),
        }}
      />

      {/* 分页 */}
      {total > 0 && (
        <div className="pagination-wrapper">
          <Pagination
            current={searchParams?.current || 1}
            pageSize={searchParams?.pageSize || 12}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleList;
