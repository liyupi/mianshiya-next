import { Tag, Select } from "antd";
import { useState, useEffect } from "react";
import "./index.css";

interface Props {
  tagList?: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
  editable?: boolean;
  placeholder?: string;
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
  const { tagList = [], value, onChange, editable = false, placeholder = "请选择或输入标签" } = props;
  const [tags, setTags] = useState<string[]>(value || tagList || []);

  useEffect(() => {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);

  const handleChange = (newTags: string[]) => {
    setTags(newTags);
    onChange?.(newTags);
  };

  // 预设的常用标签
  const commonTags = [
    "Java", "Spring", "Spring Boot", "MySQL", "Redis", "JavaScript", "React", "Vue",
    "Node.js", "Python", "算法", "数据结构", "面试", "后端", "前端", "全栈",
    "微服务", "分布式", "高并发", "性能优化", "Docker", "Kubernetes"
  ];

  if (editable) {
    return (
      <div className="tag-list editable">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder={placeholder}
          value={tags}
          onChange={handleChange}
          options={commonTags.map(tag => ({ label: tag, value: tag }))}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          allowClear
        />
      </div>
    );
  }

  // 显示模式
  return (
    <div className="tag-list">
      {tags.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;
