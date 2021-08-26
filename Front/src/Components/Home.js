import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop.js';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    Books: {
        position:'relative',
        backgroundColor: theme.palette.blue,
        color:theme.palette.common.grey,
        margineBottom: theme.spacing(5)
    },
    BookSearchTextField: {
        verticalAlign: 'baseline'
    },
    BookTable: {
        height:380
    },
    modal: {
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center',
    },
    modal_paper: {
        position: 'relative',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex'
    },
  } 
));

const columns = [
    { field: 'id',
    headerName: 'Book Id',
    type: 'number',
    minWidth: 150,
    editable: false,
    },
    { field: 'title',
    headerName: 'Book Title',
    type: 'string',
    minWidth: 150,
    editable: false,
    },
    { field: 'ISBN',
    headerName: 'Book ISBN',
    type: 'string',
    minWidth: 150,
    editable: false,
    },
    { field: 'user_id',
    headerName: 'Checked Out',
    type: 'number',
    minWidth: 150,
    editable: false,
    },
    { field: 'due_date',
    headerName: 'Due Date',
    type: 'date',
    minWidth: 150,
    editable: false,
    },
    
]

const Home = () => {
    const classes = useStyles(); 
    const [isMobileView, setIsMobileView] = useState(false);
    //Initial State for Books Table:
    const [books, setBooks] = useState([])
    const [rows, setRows] = useState([]);
    const [updateBooks, setUpdateBooks] = useState('')

    //State for Search Function:
    const [searchValue, setSearchValue]= useState('')
    const [finalSearchValue, setFinalSearchValue] = useState('')

    //state for selected Rows:
    const [selectedRows, setSelectedRows]= useState([])
    const [userId, setUserId] = useState('')

    //state for Posting New Book through Modal:
    const [newBookTitle, setNewBookTitle] = useState('')
    const [newBookISBN, setNewBookISBN] = useState('')
    const [newBookAuthor, setNewBookAuthor] = useState('')
    const [open, setOpen] = useState(false)

    const [sortModel, setSortModel]= useState('')

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }
    
    const checkOutBook = async () => {
        const promises = []
        for (let row of rows) {
          if (!selectedRows.includes(row.id)) {
            continue;
          }
          promises.push(new Promise((resolve, reject) => {
            fetch(`http://localhost:8080/books/${row.id}/checkout/${userId}`, { method: 'PATCH' })
              .then(response => resolve(response));
          }));
        }
        Promise.all(promises)
      .then(responses => console.log(responses))
          .then(data => setUpdateBooks(data))
      };


    const handleNewBook = (event) => {
      event.preventDefault()
      console.log('Posting a new book...', newBookTitle, newBookISBN, newBookAuthor)
      axios.post(`http://localhost:8080/books/new/${newBookTitle}/${newBookISBN}/${newBookAuthor}`)
      .then(res => {
        console.log('Was my book posted?:', res)
        return setUpdateBooks(res)
      })

      handleClose()
    }

    const returnBook = async () => {
      const promises = []
      for (let row of rows) {
        if (!selectedRows.includes(row.id)) {
          continue;
        }
        promises.push(new Promise((resolve, reject) => {
          fetch(`http://localhost:8080/books/${row.id}/return`, { method: 'PATCH' })
            .then(response => resolve(response));
        }));
      }    
      Promise.all(promises)
      .then(responses => console.log(responses))
          .then(data => setUpdateBooks(data))
      };

    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 1280
          ? setIsMobileView(true)
          : setIsMobileView(false);
      };
  
      setResponsiveness();
      window.addEventListener("resize", () => setResponsiveness());

      
  
      return () => {
        window.removeEventListener("resize", () => setResponsiveness());
      }
      
    },[]);

    useEffect(() => {
        if (finalSearchValue !== '') {
            fetch(`http://localhost:8080/books/${finalSearchValue}`)
            .then(response => response.json())
            .then(data => setRows(data))
        } else {
            axios.get('http://localhost:8080/books')
            .then(res => setRows(res.data)
            )
        }
    }, [finalSearchValue, updateBooks])

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          {isMobileView
            ? <HeaderMobile title="SDI Library -A Mobile View"/>
            : <HeaderDesktop title="SDI Library"/>}
        </Container>
        <Grid item xs={12}>
          <TextField onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={classes.BookSearchTextField} placeholder='Search by BookId'></TextField>
          <IconButton onClick={() => setFinalSearchValue(searchValue)}>
            <SearchIcon/>
          </IconButton>
          <Button onClick={() => {setFinalSearchValue('')}}>Return To Main List</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField onChange={(event) => setUserId(event.target.value)} value={userId} className={classes.BookSearchTextField} placeholder='Enter User Id To Checkout'></TextField>
          <Button
          disabled={selectedRows.length === 0} 
          onClick={() => {checkOutBook()}}
          >
          Check Out Books
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
          disabled={selectedRows.length === 0} 
          onClick={() => {returnBook()}}
          >
          Return Books
          </Button>
        </Grid>
        <Grid className={classes.BookTable} item container>   
          <DataGrid 
            rows={rows}
            rowHeight={25}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu={false}
            onSelectionModelChange={newSelectedRows => setSelectedRows(newSelectedRows)}
            selectionModel={selectedRows}
            disableColumnMenu={false}
          />
        </Grid>
        <button type='Button' onClick={handleOpen}>
          Add Book
        </button>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
        >
        <Fade in={open}>
        <div className={classes.modal_paper}>
         <form>
           <TextField onChange={(event) => setNewBookTitle(event.target.value)}id='Title' label='Title' variant='filled' />
           <TextField onChange={(event) => setNewBookAuthor(event.target.value)}id='Author' label='Author' variant='filled' />
           <TextField onChange={(event) => setNewBookISBN(event.target.value)}id='ISBN' label='ISBN' variant='filled' />
           <Button variant='outlined' type='Submit' label='Submit' onClick={(event) => handleNewBook(event)}>Submit</Button>
         </form>
         </div>
         </Fade>
        </Modal>
        <Footer/>
      </React.Fragment>
    );
  }
  
  export default Home