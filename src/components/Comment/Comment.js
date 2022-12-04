import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import ChildComment from "../ChildComment/ChildComment";
import styles from "./comment.module.scss"
const Comment = ({ author, comment, date, children, id, upvote }) => {
  const [commentState, setCommentState] = useState(false);
  const [child,setChild] = useState([])
  const [showComments, setShowCommants] = useState(false)
  const [upvt, setUpvt] = useState(upvote)
  const [replyState, setReplyState] = useState(false)
  const upvoteHandler = () => {
    
    const docRef = doc(db, "comments", id)
  
    const data = {
      upvote: (upvote) + 1
    }
    updateDoc(docRef, data)
.then(docRef => {
    console.log("A New Document Field has been added to an existing document");
})
.catch(error => {
    console.log(error);
})
setUpvt(upvote+1)
  }
  const commentStateHandler = () => {
    setCommentState(!commentState);
  };
  const showCommentsHandler = () => {
    setShowCommants(!showComments)
  }
  useEffect(() => {
    setChild(children.filter(x=>x.childOf == id))
  },[replyState])
  const commentHandler = (e) => {
    e.preventDefault()
    
    const dt = new Date()
    addDoc(collection(db, 'comments'),{
        child:true,
        childOf:id,
        comment:e.target.comment.value,
        date:dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(),
        author:'iDidnotSetCustomAuthor',
        upvote:0
    })
    setChild(children.filter(x=>x.childOf == id))
   
    setTimeout(() => {
    setReplyState(!replyState)
      
    }, 2000);
    
    
  }
  return (
    <Box
    className={styles.comment}
      p="2rem"
      border="1px solid white"
      borderRadius="10px"
      display="flex"
      flexDir="column"
      w="100%"
      h="max-content"
      margin='1rem 0'
    >
      <Box>
        <Text>{comment}</Text>
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Flex>
            <Text onClick={upvoteHandler} marginRight='1rem'>{upvt + ' Upvote'}</Text>
            <Text marginRight='1rem' cursor="pointer" onClick={commentStateHandler}>
              Comment
            </Text>
            <Text cursor="pointer" onClick={showCommentsHandler}>
              Comments {'('+child.length+')'}
            </Text>
          </Flex>
          <Flex>
            <Text marginRight='1rem'>{author}</Text>
            <Text>{date}</Text>
          </Flex>
        </Box>
       
        {showComments&& child.map(child=><Box>
          <ChildComment upvote={child.upvote} children={children} comment={child.comment} id={child.id} author={child.author} date={child.date} />
        </Box>)
        
        }
        {commentState && (
          <Box margin='1rem 0'>
            <form onSubmit={commentHandler}>
              <Textarea name='comment'></Textarea>
              <Input marginTop='1rem' type="submit"></Input>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
