import { useEffect, useState } from "react";
import commentsData from "../data/comments.json";
type CommentsData = {
  [key: string]: string[];
};

export function useComments(songId: string) {
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("../data/comments.json")
      .then((res) => res.json())
      .then((data: CommentsData) => {
        setComments(data[songId] || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [songId]);

  const addComment = (comment: string) => {
    setComments((prev) => [...prev, comment]);

    // تحديث الـ localStorage بديل عن الكتابة المباشرة في JSON
    const stored = localStorage.getItem("comments");
    let allComments: CommentsData = stored ? JSON.parse(stored) : {};

    if (!allComments[songId]) allComments[songId] = [];
    allComments[songId].push(comment);

    localStorage.setItem("comments", JSON.stringify(allComments));
  };

  return { comments, addComment, loading };
}
