import React, { useState, useEffect } from 'react';
import './App.css';
import fire from './fire';
import TextField from '@mui/material/TextField';
import Head  from './components/header';



function App() {

  useEffect (() => {
    readNoteFromDatabase()
  },[]);
 /*Declaration of the state*/ 
   const [Subject, setSubject] = useState('');
   const [Topic, setTopic] = useState('');
   const [NoteInput, setNoteInput] = useState('');
   
   const [myNote, setmyNote] = useState([]);
 
 
   const handleChangeSubject = (event) => {
     setSubject(event.target.value);
     };
    const handleChangeTopic = (event) => {
     setTopic(event.target.value);
   };
 const handleChangeNoteInput = (event) => {
     setNoteInput(event.target.value);
   };

   /*Add value to the database*/ 
 
   const onCreat = () => {

    
 
     fire.database().ref("/note").push({
       subject : Subject,
       
       topic : Topic,
       noteInput : NoteInput,
    
       
       
       
     });

    
     
     
   };

  
 /* Remove the value from database */
   function removeData(id) {
     
     fire.database().ref("/note").child(id).remove();
   };
 
   /*Read value to the database */

   const readNoteFromDatabase = () => {
     fire.database().ref("/note").on("child_added",(snapshot) => {
       const myNoteList = myNote;
       const noteInDatabase = {

        id:snapshot.key,
        subject :snapshot.val().subject,
        topic : snapshot.val().topic,
        noteInput : snapshot.val().noteInput

       }
       
        myNoteList.push(noteInDatabase)
       
         setmyNote(myNoteList);

         
       
      
     });
       
     
     fire.database().ref("/note").on("child_removed",(snapshot) => {
    
      let myNoteList = myNote;       
      myNoteList = myNoteList.filter(data => data.id !== snapshot.key )
      setmyNote(myNoteList);
      
      
     
    });
   };
   
   /* Select the value from the database */

   function selectData(id)  {

    fire.database().ref("/note").child(id).on("value",(snapshot) => {

      document.getElementById("NoteInput" ).value = snapshot.val().noteInput;
      document.getElementById("Subject" ).value = snapshot.val().subject;
      document.getElementById("Topic" ).value = snapshot.val().topic;
    });

   }
  /* Updatae a value from databse */

  function UpdataData(id) {

    fire.database().ref("/note").child(id).update({
     
      noteInput : NoteInput,
     
    });
  }

  return (
    <div style = {{display:'flex',flex:1,flexDirection :"row",margin :10,backgroundColor:'#9bdde8'}}>
        <div style = {{flex:2/5 ,border : "1px solid black" ,margin :10,padding :10}}>
        <Head title = "NOTES"/>

         
        { 
              myNote.map((info) => {
                return(
                 
                     
                
                  <div style = {{ display : "flex",padding:5,margin:5,border :"1px solid black", backgroundColor : "grey",width :500,height :50}}>
                 
                  <div style = {{ display : "flex", flex:1,flexDirection:"row"}}>  

                     <div style ={{flex:1/2}}> <h4 style = {{padding : 5,margin:5}}>{info.subject}--------{info.topic}</h4></div>
                    <div  style ={{flex:1/2}}>
                    <button style = {{backgroundColor:"white",padding : 5,margin:5}} onClick = {() => {removeData(info.id)}}>Delete</button>
                    <button style = {{backgroundColor:"white",padding : 5,margin:5}}  onClick = {() => {selectData(info.id)}}>Select</button>
                    <button style = {{backgroundColor:"white",padding : 5,margin:5}} onClick = {() => {UpdataData(info.id)}}>Update</button>
                    </div>
                    
                    
                  </div>
                  
                  
                  </div>

                  
                  )
              })
            }
        </div>

       
           <hr></hr>

           <div style = {{flex :9/10,flexDirection : "column"}}>

           <div style = {{flex:3/5 ,border : "1px solid black" , margin :10,padding :10}}>
          
          <div style = {{ display:'flex' ,flex:1 , flexDirection :"row",margin :1}}>
             
             <div style = {{flex:1/2 ,margin : 1 ,padding :1}}>
               <TextField
                               id="Subject"
                               label="Subject"
                               multiline
                               maxRows={4}
                               value={Subject}
                               onChange={handleChangeSubject}
                               variant="outlined"
                               style = {{margin :10,backgroundColor:"white"}}
                             />
                         </div>  

             <div style = {{flex:1/2, margin : 1 ,padding :1}}>
               

                <TextField
                               id="Topic"
                               label="Topic"
                               multiline
                               maxRows={4}
                               value={Topic}
                               onChange={handleChangeTopic}
                               variant="outlined"
                               style = {{margin :10,backgroundColor:"white"}}
                             />  
                       
                </div>
            
            
            </div>
           
          </div>

             <Head title = "Write Here...."/>

             <div><input id = "NoteInput" type = "text" style = {{width : 1000 ,height : 400,margin :5,fontSize:20}} onChange = {handleChangeNoteInput} value = {NoteInput}/></div>

               <div>
               <span><button style ={{margin : 10,padding :10 ,width : 1000,fontSize:20,backgroundColor : "black" ,color :"powderblue",textAlign: "center"}}onClick = {onCreat}>Create Note</button></span>
              
               </div>

            </div> 

          
    </div>
  );
}

export default App;
