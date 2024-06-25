import React from "react";

interface BlogPostProps {
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  return (
    <div className="p-4">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogPost;
