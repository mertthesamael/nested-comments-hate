import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import ChildComment from "../ChildComment/ChildComment";

const Comment = ({ author, comment, date, children, id }) => {
  const [commentState, setCommentState] = useState(false);
  const [child,setChild] = useState([])
  const commentStateHandler = () => {
    setCommentState(!commentState);
  };
  useEffect(() => {
    setChild(children.filter(x=>x.childOf == id))
  },[])
  const commentHandler = (e) => {
    e.preventDefault()
    console.log(e.target.comment.value)
    const dt = new Date()
    addDoc(collection(db, 'comments'),{
        child:true,
        childOf:id,
        comment:e.target.comment.value,
        date:dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
        author:'iDidnotSetCustomAuthor'
    })
    setChild(children.filter(x=>x.childOf == id))

  }
  return (
    <Box
      p="2rem"
      border="1px solid white"
      borderRadius="10px"
      display="flex"
      flexDir="column"
      w="100%"
      h="max-content"
    >
      <Box>
        <Text>{comment}</Text>
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Flex>
            <Text cursor="pointer" onClick={commentStateHandler}>
              Comment
            </Text>
          </Flex>
          <Flex>
            <Text>{author}</Text>
            <Text>{date}</Text>
          </Flex>
        </Box>
        {child.map(child=><Box>
          <ChildComment children={children} comment={child.comment} id={child.id} author={child.author} date={child.date} />
        </Box>)
        
        }
        {commentState && (
          <Box>
            <form onSubmit={commentHandler}>
              <Textarea name='comment'></Textarea>
              <Input type="submit"></Input>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
