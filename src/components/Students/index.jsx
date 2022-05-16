import { async } from "@firebase/util"
import { onSnapshot, query, where, collection, doc, getDoc, collectionGroup, getDocs} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "../../../config/Auth"
import { db } from "../../../config/firebase"

 const Student = () => {
    const {currentUser} = useAuth()
    const [group, setGroup] = useState()
    const [lesson, setLesson] = useState()
    const [category, setCategory] = useState()
    // const [level, setLevel] = useState()
    // const [user, setUser] = useState()
    // const [comment, setComment] = useState()
    function getLesson(id, level) {
        const lessonQuery = query(collection(db, 'groups/' + id + '/lessons'), where('level_id', '<=', level))
        onSnapshot(lessonQuery, (queryLesson) => {
            setLesson(queryLesson.docs.map((l) => ({...l.data(), lessonId: l.id})))
        })
    }
    useEffect(() => {
        const fetchData = async() => {
            const categoryDoc = collection(db, 'categories')
        const categoryQuery = query(categoryDoc, where('students', 'array-contains', currentUser.uid))
        onSnapshot(categoryQuery, (q) => {
            q.docs.map( (qq) => {
                setCategory(qq.data().name)

            })
        })
        const groupDoc = collection(db, 'groups')
        const groupQuery = query(groupDoc, where('students', 'array-contains', currentUser.uid) )
        onSnapshot(groupQuery, (gr) => {
            let groups = []
            let lessons = []
            gr.docs.map((g) => {

                groups.push({...g.data()})
                const lessonDoc = collection(db, 'groups/' + g.id + '/lessons')
                const lessonQuery = query(lessonDoc , where('level_id','<=', g.data().level_id ))
                onSnapshot(lessonQuery, (queryLesson) => {
                    lessons.push(queryLesson.docs.map((l) => ({...l.data()})))
                    setLesson(lessons)
                })
                setGroup(groups)
            })
        })

        // const lessonQuery = query(collection(db, 'groups/' + userSnap.data().groups[0] + '/lessons'), where('level_id', '<=', qq.data().level_id))
        // onSnapshot(lessonQuery, (queryLesson) => {
        //     setLesson(queryLesson.docs.map((l) => ({...l.data(), lessonId: l.id})))
        // })
        }
        fetchData()
    }, [])
    return (
        <div>
        {/* <pre>{JSON.stringify(user)}</pre> */}
            <pre>{JSON.stringify(category)}</pre>
            group
            <pre>{JSON.stringify(group)}</pre>
            lesson
            <pre>{JSON.stringify(lesson)}</pre>

        </div>
    )
}
export default Student
// useEffect(() => {
//     const fetchUserData = async () => {
//         const userDoc = doc(db, 'users', currentUser.uid)
//         const userSnap = await getDoc(userDoc)
//         if(userSnap.data().groups) {
//             let groups = []
//             userSnap.data().groups.map( async(group, index) => {
//                 const groupCol = collection(db, 'groups')
//                 const groupDoc = doc(groupCol, group )
//                 const groupSnap = await getDoc(groupDoc)
//                 groups.push({...groupSnap.data(), groupId:groupSnap.id })
//                 setGroup(groups)
//             })
//         }
//         const lessonCol = collection(db, 'lessons')
//         const categoryCol = collection(db, 'categories')
//         const commentCol = collection(db, 'comments')
//         if(group !== undefined) {

//             const categoryDoc = doc(categoryCol, group[0].categoryId)
//             const categorySnap = await getDoc(categoryDoc)
//             setCategory({...categorySnap.data(), categoryId: categorySnap.id})

//             const lessonQuery = query(lessonCol, where('groupId', '==', group[0].groupId))
//             onSnapshot(lessonQuery, (queryLessonSnapshot) => {
//                 setLesson(queryLessonSnapshot.docs.map(l => ({...l.data(), lessonId: l.id})))
//             })
//             if(lesson) {
//                 const commentQuery = query(commentCol, where('lessonId', '==', lesson[0].lessonId))
//             onSnapshot(commentQuery, (queryCommentSnapshot) => {
//                 setComment(queryCommentSnapshot.docs.map(com => ({...com.data(), commentId: com.id})))
//             })
//             }

//         }
//         return userSnap.data()
//     }
//     fetchUserData().then((data) => setUser(data))

// }, [setGroup, setLesson])