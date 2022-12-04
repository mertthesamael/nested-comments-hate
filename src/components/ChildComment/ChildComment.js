import { Box, Flex, Input, Text, Textarea } from "@chakra-ui/react"
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import Comment from "../Comment/Comment";


const ChildComment = ({comment, id, author, date, children}) => {
    
    const [commentState, setCommentState] = useState(false);
    const [child,setChild] = useState([])
    const commentStateHandler = () => {
      setCommentState(!commentState);
    };
    
    useEffect(() => {
      setChild(children.filter(comment => comment.childOf == id))
    },[])
    
    const formHandler = (e) => {
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
    return(
        <Box margin='1rem 0' p='2rem' border='1px solid white' borderRadius='10px' display='flex' flexDir='column' w="100%" h="max-content">
<Box>
        <Text>
        {comment}
        </Text>
      </Box>
      <Box display='flex' justifyContent='space-between'>
            <Flex>
          <Text cursor='pointer' onClick={commentStateHandler}>Comment</Text>
            </Flex>
            <Flex>
            <Text>{author}</Text>
            <Text>{date}</Text>
            </Flex>
        </Box>
        {child?.map(child=><Box>
          <Comment children={children} comment={child.comment} id={child.id} author={child.author} date={child.date} />
        </Box>)
        
        }
        {commentState&&
        <Box>
           <form onSubmit={formHandler}>
            <Textarea name='comment'></Textarea>
            <Input type='submit'></Input>
           </form>
        </Box>}
        </Box>
    )

}

export default ChildComment;