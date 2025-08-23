"use client";
import { useState, useEffect } from "react";
import { Input, Select, Button, Space, Pagination } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { getMockArticles, getMockCategories } from "@/mock/articleData";
import ArticleList from "@/components/ArticleList";
import "./index.css";

const { Search } = Input;
const { Option } = Select;

interface Props {
  defaultArticleList?: API.ArticleVO[];
  defaultTotal?: number;
  defaultSearchParams?: {
    title?: string;
    category?: string;
    tags?: string[];
  };
}

/**
 * 文章表格组件
 * @param defaultArticleList 默认文章列表
 * @param defaultTotal 默认总数
 * @param defaultSearchParams 默认搜索参数
 * @constructor
 */
const ArticleTable: React.FC<Props> = ({
  defaultArticleList = [],
  defaultTotal = 0,
  defaultSearchParams = {},
}) => {
  const [articleList, setArticleList] = useState<API.ArticleVO[]>(defaultArticleList);
  const [total, setTotal] = useState<number>(defaultTotal);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<API.ArticleQueryRequest>({
    current: 1,
    pageSize: 12,
    sortField: "createTime",
    sortOrder: "descend",
    ...defaultSearchParams,
  });

  // 获取文章列表
  const loadData = async (params: API.ArticleQueryRequest) => {
    setLoading(true);
    try {
      // 使用假数据
      const mockData = getMockArticles(params);
      setArticleList(mockData.records);
      setTotal(mockData.total);
    } catch (e: any) {
      console.error("获取文章列表失败", e);
    }
    setLoading(false);
  };

  // 搜索
  const handleSearch = (value: string) => {
    const newParams = {
      ...searchParams,
      searchText: value,
      current: 1,
    };
    setSearchParams(newParams);
    loadData(newParams);
  };

  // 分类筛选
  const handleCategoryChange = (value: string) => {
    const newParams = {
      ...searchParams,
      category: value,
      current: 1,
    };
    setSearchParams(newParams);
    loadData(newParams);
  };

  // 排序
  const handleSortChange = (value: string) => {
    const [sortField, sortOrder] = value.split("_");
    const newParams = {
      ...searchParams,
      sortField,
      sortOrder,
      current: 1,
    };
    setSearchParams(newParams);
    loadData(newParams);
  };

  // 分页
  const handlePageChange = (page: number, pageSize: number) => {
    const newParams = {
      ...searchParams,
      current: page,
      pageSize,
    };
    setSearchParams(newParams);
    loadData(newParams);
  };

  // 重置
  const handleReset = () => {
    const newParams = {
      current: 1,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    };
    setSearchParams(newParams);
    loadData(newParams);
  };

  // 初始化加载
  useEffect(() => {
    if (defaultArticleList.length === 0) {
      loadData(searchParams);
    }
  }, []);

  return (
    <div className="article-table">
      {/* 搜索和筛选区域 */}
      <div className="article-table-header">
        <Space wrap>
          <Search
            placeholder="搜索文章标题或内容"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Select
            placeholder="选择分类"
            allowClear
            style={{ width: 120 }}
            onChange={handleCategoryChange}
            value={searchParams.category}
          >
            {getMockCategories().map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
          <Select
            placeholder="排序方式"
            style={{ width: 120 }}
            onChange={handleSortChange}
            value={`${searchParams.sortField}_${searchParams.sortOrder}`}
          >
            <Option value="createTime_descend">最新发布</Option>
            <Option value="createTime_ascend">最早发布</Option>
            <Option value="viewCount_descend">最多浏览</Option>
            <Option value="thumbNum_descend">最多点赞</Option>
            <Option value="favourNum_descend">最多收藏</Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </Space>
      </div>

      {/* 文章列表 */}
      <div className="article-table-content">
        <ArticleList articleList={articleList} loading={loading} />
      </div>

      {/* 分页 */}
      {total > 0 && (
        <div className="article-table-pagination">
          <Pagination
            current={searchParams.current}
            pageSize={searchParams.pageSize}
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            }
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleTable;
