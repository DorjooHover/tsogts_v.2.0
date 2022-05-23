import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Loading from '../src/components/Loader/Loading';
import Login from '../src/components/user/Login';
import nookies from 'nookies';
import {
	collection,
	query,
	addDoc,
	serverTimestamp,
	where,
	getDoc,
	doc,
	getDocs,
	setDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
		isTeacher: false,
		isAdmin: false,
	});
	useEffect(() => {
		const auth = getAuth();
		return auth.onAuthStateChanged(async user => {
			if (user) {
				const docRef = doc(db, 'users', user.uid);
				await getDoc(docRef).then(doc => {
					if (doc.data() == undefined) {
						if (
							userData.password != '' &&
							userData.email != ''
						) {
							setDoc(docRef, {
								name:
									userData.firstName +
									' ' +
									userData.lastName,
								phone: userData.phone,
								isAdmin: false,
								isTeacher: false,
								email: userData.email,
								timestamp: serverTimestamp(),
							});
						} else {
							setDoc(docRef, {
								name: user.displayName,
								phone: null,
								isAdmin: false,
								isTeacher: false,
								email: user.email,
								photo: user.photoURL,
								timestamp: serverTimestamp(),
							});
						}
					}
					setUser(doc.data());
				});
				setCurrentUser(user);
				setLoading(false);
			} else {
				setCurrentUser(null);
				setLoading(false);
			}
		});
	}, [userData, setUserData]);

	if (loading) {
		return <Loading type="balls" color="yellowgreen" loading={loading} />;
	}
	if (!currentUser) {
		return <Login setUserData={setUserData} userData={userData} />;
	} else {
		return (
			<AuthContext.Provider value={{ currentUser, user, userData }}>
				{children}
			</AuthContext.Provider>
		);
	}
};

export const useAuth = () => useContext(AuthContext);
