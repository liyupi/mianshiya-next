import { Input } from "antd";
import { useRouter } from "next/navigation";
import "./index.css";

interface Props {}

/**
 * 搜索条组件
 * @constructor
 */
const SearchInput = (props: Props) => {
  const router = useRouter();

  return (
    <div
      className="search-input"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
    >
      <Input.Search
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        placeholder="搜索题目"
        onSearch={(value) => {
          router.push(`/questions?q=${value}`);
        }}
      />
    </div>
  );
};

export default SearchInput;
