import {
  projectFirestore,
  projectStorage,
  projectAuth,
  timestamp,
} from './firebase/config';
import { getDate } from './helper';

const getDocument = async (coll, id) => {
  try {
    let doc = await projectFirestore.collection(coll).doc(id).get();
    let place = { id: doc.id, ...doc.data() };
    return place;
  } catch (error) {
    throw error;
  }
};

const getCollection = async coll => {
  try {
    let { docs } = await projectFirestore.collection(coll).get();
    return docs;
  } catch (error) {
    throw error;
  }
};

const updateDocument = async (coll, id, data) => {
  try {
    await projectFirestore.collection(coll).doc(id).update(data);
    return true;
  } catch (error) {
    throw error;
  }
};

const removeDocument = async (coll, id) => {
  try {
    await projectFirestore.collection(coll).doc(id).delete();
    return true;
  } catch (error) {
    throw error;
  }
};

const onSnapshotCollection = (coll, setPlaces) => {
  projectFirestore.collection(coll).onSnapshot(({ docs }) => {
    setPlaces([]);
    docs.forEach(doc => {
      setPlaces(curr => [...curr, { id: doc.id, ...doc.data() }]);
    });
  });
};

const getCategories = async coll => {
  try {
    let { docs } = await projectFirestore.collection(coll).get();

    let cats = docs[0] ? { id: docs[0].id, ...docs[0].data() } : undefined;
    return cats;
  } catch (error) {
    throw error;
  }
};

const setCategories = async (coll, id, data) => {
  try {
    await projectFirestore.collection(coll).doc(id).set(data);
  } catch (error) {
    throw error;
  }
};

const onSnapshotCategories = async (coll, id, setCategories) => {
  try {
    await projectFirestore
      .collection(coll)
      .doc(id)
      .onSnapshot(doc => {
        setCategories(doc.data().categories);
      });
  } catch (error) {
    throw error;
  }
};

const removeImg = async url => {
  try {
    let imgRef = projectStorage.refFromURL(url);
    await imgRef.delete();
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} file sube el file a un directorio de firebase/storage
 * @returns una promesa con la URL publica de la imagen
 */
const putStorageFile = file => {
  let path = `${DIR_IMAGES}${getDate()}_${file.name}`;
  let fileRef = projectStorage.ref(path);
  let uploadTask = fileRef.put(file);
  return uploadTask
    .then(snapshot => {
      return new Promise((resolve, reject) => {
        snapshot.ref
          .getDownloadURL()
          .then(imageURL => resolve(imageURL))
          .catch(e => reject(e));
      });
    })
    .catch(error => {
      console.log('One failed:', file.name, error.message);
    });
};

const DIR_IMAGES = 'imgPlaces/';

const login = async (email, password) => {
  try {
    await projectAuth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  try {
    await projectAuth.signOut();
  } catch (error) {
    throw error;
  }
};

const existeElProducto = async (collName, name) => {
  const { docs } = await projectFirestore
    .collection(collName)
    .where('name', '==', name)
    .get();

  return docs.length != 0 ? true : false;
};

const subirVariosFilesAndDocument = async (
  docData,
  storgFiles,
  collName,
  setUploadStatus,
) => {
  const collectionRef = projectFirestore.collection(collName);
  Promise.all(storgFiles.map(file => putStorageFile(file)))
    .then(async urlImages => {
      docData.createdAt = timestamp();
      docData.urls = urlImages;
      await collectionRef.add(docData);
      setUploadStatus({
        loading: false,
        error: null,
        ok: {
          title: 'Bien hecho',
          body: 'Se subieron los datos con exito!',
          type: 'alert-success',
        },
      });
    })
    .catch(err => {
      setUploadStatus({
        loading: false,
        error: {
          title: '',
          body: err.message,
          type: 'alert-danger',
        },
        ok: null,
      });
    });
};

const updateDocumentAndFiles = async (
  docData,
  storgFiles,
  idDoc,
  collName,
  setUploadStatus,
) => {
  const collectionRef = projectFirestore.collection(collName).doc(idDoc);
  try {
    if (storgFiles.length > 0) {
      try {
        await Promise.all(storgFiles.map(file => putStorageFile(file)))
          .then(async urlImages => {
            docData.urls = [...docData.urls, ...urlImages];
            await collectionRef.update({ ...docData });
            setUploadStatus({
              loading: false,
              error: null,
              ok: {
                title: 'Perfecto',
                body: 'Actualización exitosa!',
                type: 'alert-success',
              },
            });
          })
          .catch(err => {
            setUploadStatus({
              loading: false,
              error: {
                title: '',
                body: err.message,
                type: 'alert-danger',
              },
              ok: null,
            });
          });
      } catch (error) {}
    } else {
      await collectionRef.update({ ...docData });
      setUploadStatus({
        loading: false,
        error: null,
        ok: {
          title: 'Perfecto',
          body: 'Actualización exitosa!',
          type: 'alert-success',
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

export {
  getDocument,
  getCollection,
  getCategories,
  updateDocument,
  removeImg,
  putStorageFile,
  removeDocument,
  setCategories,
  onSnapshotCategories,
  onSnapshotCollection,
  login,
  logout,
  subirVariosFilesAndDocument,
  updateDocumentAndFiles,
  existeElProducto,
};
