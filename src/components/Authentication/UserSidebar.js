import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar,Button } from '@mui/material';
import './UserSidebar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';




export default function UserSidebar() {
  const [state, setState] = React.useState({
  
    right: false,
  });

  const{user,setAlert} = CryptoState();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);
  
    setAlert({
      open:true,
      type:"success",
      message: "Logout Successfull !"
    });
  
    toggleDrawer();
    }
    



  return (
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
        height:38,
        width:38,
        cursor:"pointer",
        backgroundColor:"#EEBC1D"
          }}
          src={user.photoURL}
          alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
         <div className='container'>
           <div className='profile'>
            <Avatar style={{
               width: 200 ,
               height: 200,
               cursor: "pointer",
               backgroundColor: "#EEBC1D",
               objectFit: "contain",
            }}
            className='picture'
            src={user.photoURL}
            alt={user.displayName || user.email}
            />
            <span
            style={{
                width:"100%",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "bolder",
                wordWrap: "break-word",
            }}
            >
                {user.displayName || user.email}
            </span>

           <div style={{
            flex: 1,
            width: "100%",
            backgroundColor: "grey",
            borderRadius: 10,
            padding: 15,
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            overflowY: "scroll",
           }}>
             <span style={{
              fontSize:15 , textShadow: "0 0 5px black"
             }}>
              WatchList
             </span>
           </div>

           </div>

           <Button 
           variant="contained"
           className="logout"
           style={{
            height:"8%",
            width:"100%",
            backgroundColor:"#EEBC1D",
            marginTop:20
           }}
           onClick={logout}
           >
               Log Out
           </Button>
         </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}


