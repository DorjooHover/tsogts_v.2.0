import { onSnapshot, query, where, collection, doc, getDoc, collectionGroup, getDocs, setDoc, updateDoc, addDoc, serverTimestamp, arrayRemove, arrayUnion, deleteDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "../../../config/Auth"
import { db } from "../../../config/firebase"

 const Admin = () => {
    const {currentUser} = useAuth()
    const [group, setGroup] = useState()
    const [lesson, setLesson] = useState()
    const [category, setCategory] = useState()
    const [level, setLevel] = useState()
    const [user, setUser] = useState()
    const [comment, setComment] = useState()
    const [student, setStudent] = useState()
    const [teacher, setTeacher] = useState()
    const [loading, setLoading] = useState(false)
    const [effectCategory, setEffectCategory] = useState({name: ''})
    const [effectLevel, setEffectLevel] = useState({level: ''})
    const [addTeacher, setAddTeacher] = useState(['iUUijYrkzuyUxkljgQMC'])
    const [addLevel, setAddLevel] = useState(['j1'])
    const [effectStudentToGroup,setEffectStudentToGroup ] = useState(['asdf', 'asd'])
    useEffect(() => {
        const fetchData = async() => {
            const teacherDoc = collection(db, 'users')
            const teacherQuery = query(teacherDoc, where('isTeacher', '==', true))
            onSnapshot(teacherQuery, (queryTeacher) => {
                setTeacher(queryTeacher.docs.map((t) => ({...t.data()})))
            })

            const studentDoc = collection(db, 'users')
            const studentQuery = query(studentDoc, where('isTeacher', '==', false), where('isAdmin', '==', false))
            onSnapshot(studentQuery, (queryStudent) => {
                setStudent(queryStudent.docs.map((s) => ({...s.data()})) )
            })
            const categoryDoc = collection(db, 'categories')
            onSnapshot(categoryDoc, (queryCategory) => {
                setCategory(queryCategory.docs.map((c) => ({...c.data(), categoryId: c.id})))  
            })
            const groupDoc = collection(db, 'groups')
            // onSnapshot(groupDoc, (gr) => {
            //     let groups = []
            //     let lessons = []
            //     // gr.docs.map((g) => {
    
            //     //     groups.push({...g.data()})
            //     //     const lessonDoc = collection(db, 'groups/' + g.id + '/lessons')
            //     //     const lessonQuery = query(lessonDoc , where('level_id','<=', g.data().level_id ))
            //     //     onSnapshot(lessonQuery, (queryLesson) => {
            //     //         lessons.push(queryLesson.docs.map((l) => ({...l.data()})))
            //     //         setLesson(lessons)
            //     //     })
            //     //     setGroup(groups)
            //     // })
            // })

        // const lessonQuery = query(collection(db, 'groups/' + userSnap.data().groups[0] + '/lessons'), where('level_id', '<=', qq.data().level_id))
        // onSnapshot(lessonQuery, (queryLesson) => {
        //     setLesson(queryLesson.docs.map((l) => ({...l.data(), lessonId: l.id})))
        // })
        }
        fetchData()
    }, [])

    const verifyTeacher = async(uid) => {
        await updateDoc(doc(db, 'users', uid), {
            isTeacher: true
        })
    }

    const addCategory = async(e) => {
        e.preventDefault()
        const teacherAdd = await addDoc(collection(db, 'categories'), {
            name: effectCategory.name,
            timestamp: serverTimestamp(),
            teachers: addTeacher,
            students: [],
            levels: addLevel
        })
    }

    const updateCategory = async(e) => {
        e.preventDefault()
        await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
            name: effectCategory.name,
            timestamp: serverTimestamp(),
            teachers: addTeacher,
            students: [],
            levels: addLevel
        })
    }

    const deleteCategory = async(cid) => {
        console.log(cid)
        await deleteDoc(doc(db, 'categories',cid ))
    }
    
    const addStudentToGroup = async(e) => {
        e.preventDefault()
        effectStudentToGroup.map(async (student) => {

            await updateDoc(doc(db, 'groups', '4sX1UN7jQ5coQlTl0lGO'), {
                students:  arrayUnion(student )
            })

            await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
                students: arrayUnion(student)
            })
        })
    }

    const deleteStudentFromGroup = async() => {
        // e.preventDefault()
        effectStudentToGroup.map(async (student) => {

            await updateDoc(doc(db, 'groups', '4sX1UN7jQ5coQlTl0lGO'), {
                students:  arrayRemove(student )
            })

            await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
                students: arrayRemove(student)
            })
        })
    }
    

    return (
        <div>
            teacher
        <pre>{JSON.stringify(teacher)}</pre>
            student
        <pre>{JSON.stringify(student)}</pre>
        category
            <pre>{JSON.stringify(category)}</pre>
            group
            <pre>{JSON.stringify(group)}</pre>
            lesson
            <pre>{JSON.stringify(lesson)}</pre>
            {/* verifyTeacher */}
            <button onClick={() => verifyTeacher('iUUijYrkzuyUxkljgQMC')}>verifyTeacher</button>

           {/* addCategory */}
           <form onSubmit={addCategory}>
               <input type="text" onChange={(e) => setEffectCategory({...effectCategory, name: e.target.value})} value={effectCategory.name} required/>
               <input type="submit" value="addCate" />
           </form>

           {/* add student to group */}

           <form onSubmit={addStudentToGroup}>
               <input type="text" />
               <input type="submit" value="addtogroup" />
           </form>
           {/* removestudentFromgroup */}
           <button onClick={deleteStudentFromGroup}>removestudentFromgroup</button>
           {/* update category */}
           <form onSubmit={updateCategory}>
           <input type="text" onChange={(e) => setEffectCategory({...effectCategory, name: e.target.value})} value={effectCategory.name} required/>
               <input type="submit" value="updateCate" />
           </form>

           {/* delete category */}
           <button onClick={() => deleteCategory('LV2pKsTqCwSHCvV4oquM')}>delete category</button>
        </div>
    )
}
export default Admin