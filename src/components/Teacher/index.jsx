import { onSnapshot, query, where, collection, doc, getDoc, collectionGroup, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, arrayRemove, arrayUnion} from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL} from '@firebase/storage'
import { useEffect, useState } from "react"
import { useAuth } from "../../../config/Auth"
import { db, storage } from "../../../config/firebase"

 const Teacher = () => {
    const {currentUser} = useAuth()
    const [group, setGroup] = useState()
    const [lesson, setLesson] = useState()
    const [category, setCategory] = useState()
    const [level, setLevel] = useState()
    const [user, setUser] = useState()
    const [comment, setComment] = useState()
    const [student, setStudent] = useState()
    const [loading, setLoading] = useState(false)
    const [addUpdateGroup, setAddUpdateGroup] = useState({name: '', level: '', level_id: null})
    const [effectStudentToGroup,setEffectStudentToGroup ] = useState(['asdf', 'asd'])

    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const fetchData = async() => {
            const categoryDoc = collection(db, 'categories')
        const categoryQuery = query(categoryDoc, where('teachers', 'array-contains', currentUser.uid))
        onSnapshot(categoryQuery, (q) => {
            q.docs.map( (qq) => {
                setCategory(qq.data().name)

            })
        })
        const groupDoc = collection(db, 'groups')
        const groupQuery = query(groupDoc, where('teacherId', '==', currentUser.uid) )
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
        const studentDoc = collection(db, 'users')
        const studentQuery = query(studentDoc, where('isTeacher', '==', false), where('isAdmin', '==', false))
        onSnapshot(studentQuery, (queryStudent) => {
            setStudent(queryStudent.docs.map((s) => ({...s.data()})))
        })
        // const lessonQuery = query(collection(db, 'groups/' + userSnap.data().groups[0] + '/lessons'), where('level_id', '<=', qq.data().level_id))
        // onSnapshot(lessonQuery, (queryLesson) => {
        //     setLesson(queryLesson.docs.map((l) => ({...l.data(), lessonId: l.id})))
        // })
        }
        fetchData()
    }, [])

    const addGroup = async(e) => {
        e.preventDefault()
        const groupRef = await addDoc(collection(db, 'groups'), {
            name: addUpdateGroup.name,
            level: addUpdateGroup.level,
            level_id: addUpdateGroup.level_id,
            timestamp: serverTimestamp()
        })
    }

    const updateGroup = async(e) => {
        e.preventDefault()
        const groupRef = await updateDoc(doc(db, 'groups', 'ecmwc4XemrUEpLPV7ZpX'), {
            name: addUpdateGroup.name,
            level: addUpdateGroup.level,
            level_id: addUpdateGroup.level_id,
            timestamp: serverTimestamp()
        })
    }

    const deleteGroup = async(gid) => {
        await deleteDoc(doc(db, 'groups', gid))
    }

    const addStudentToGroup = async(e) => {
        e.preventDefault()
        effectStudentToGroup.map(async (student) => {

            await updateDoc(doc(db, 'groups', 'ecmwc4XemrUEpLPV7ZpX'), {
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

            await updateDoc(doc(db, 'groups', 'ecmwc4XemrUEpLPV7ZpX'), {
                students:  arrayRemove(student )
            })

            await updateDoc(doc(db, 'categories', 'IkrJJbMBMvvEsroJKIt8'), {
                students: arrayRemove(student)
            })
        })
    }


    const formHandler = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        // console.log(file)
        uploadFiles(file)
    }

    const uploadFiles = (file) => {
        if(!file) return
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed', (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)    
        setProgress(prog)
        }, (err) => console.log(err), () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                const lessonDoc = collection(db, 'groups/' + 'ecmwc4XemrUEpLPV7ZpX' + '/lessons')
                const lessonSnap = await addDoc(lessonDoc, {
                    level_id: 2,
                    name: 'asdf',
                    video: url
                })
                console.log(lessonSnap)
            })
        })

    }

    const deleteLesson = async (lid) => {
        const lessonDelete = await (doc(db, 'groups/' + 'ecmwc4XemrUEpLPV7ZpX' + '/lessons', lid))
        console.log(lessonDelete)
    }
    return (
        <div>
            user
        <pre>{JSON.stringify(user)}</pre>
        category
            <pre>{JSON.stringify(category)}</pre>
            group
            <pre>{JSON.stringify(group)}</pre>
            lesson
            <pre>{JSON.stringify(lesson)}</pre>
            comment
            <pre>{JSON.stringify(student)}</pre>
             {/* groupAdd */}
             <form onSubmit={addGroup}>

                <input type="text" onChange={(e) => setAddUpdateGroup((addUpdateGroup) => ({...addUpdateGroup, name: e.target.value} ))} required/>
                <input type="text" id={1} onChange={(e) => setAddUpdateGroup((addUpdateGroup) => ({...addUpdateGroup, level: e.target.value , level_id: e.target.id} ))} required value={addUpdateGroup.level}/>
                <input type="submit" value="add" />
            </form>

             {/* update group */}
             <form onSubmit={updateGroup}>

                <input type="text" onChange={(e) => setAddUpdateGroup((addUpdateGroup) => ({...addUpdateGroup, name: e.target.value} ))} required/>
                <input type="text" id={1} onChange={(e) => setAddUpdateGroup((addUpdateGroup) => ({...addUpdateGroup, level: e.target.value , level_id: e.target.id} ))} required value={addUpdateGroup.level}/>
                <input type="submit" value="update" />
            </form>

            {/* delete group */}
            <button onClick={() => deleteGroup('ecmwc4XemrUEpLPV7ZpX')}>delete group</button>

            {/* add student to group */}

           <form onSubmit={addStudentToGroup}>
               <input type="text" />
               <input type="submit" value="addtogroup" />
           </form>
           {/* removestudentFromgroup */}
           <button onClick={deleteStudentFromGroup}>removestudentFromgroup</button>

           {/* add lesson */}
           <form onSubmit={formHandler}>
               {/* <input type="text" /> */}
               <input type="file" name="video" id="video" />
               <input type="submit" value="upload" />
           </form>
           <h3>uploaded {progress}</h3>

           {/* delete lesson */}
           <button onClick={() => deleteLesson('TTBDSTKDUwo1wzLUeO2F')}>delete lesson</button>
        </div>
    )
}
export default Teacher