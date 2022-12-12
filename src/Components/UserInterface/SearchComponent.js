import { useEffect, useState } from "react"
import { getData, ServerURL } from '../Services/FetchNodeServices'
import { Paper, Box, Divider, TextField } from '@mui/material';
import { LocationOn } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import DateDiff from "date-diff";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function SearchComponent(props) {

  const [selectedCity, setSelectedCity] = useState('Gwalior')
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);

  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [daysTime,setDaysTime]=useState('')


  const handleCitySelect = (cityselected) => {
    setSelectedCity(cityselected)
    setOpen(false)
  }
  const fetchAllCities = async () => {
    var response = await getData('user/display_all_cities')
    setCities(response.data)
  }

  const showTopList = () => {
    return cities.map((item) => {
      return (<>
        {item.status == 'Top City' ?
          <ListItem button>
            <ListItemText primary={<span style={{ fontSize: 18, fontWeight: 'bold', }}>{item.cityname}</span>} style={{ fontSize: 18 }} onClick={() => handleCitySelect(item.cityname)} />
          </ListItem> : <></>
        }</>)
    })
  }

  const showOtherList = () => {
    return cities.map((item) => {
      return (<>
        {item.status == 'Other City' ?
          <ListItem button>
            <ListItemText primary={item.cityname} style={{ fontSize: 18 }} onClick={() => handleCitySelect(item.cityname)} />
          </ListItem> : <></>
        }</>)
    })
  }

  useEffect(function () {
    fetchAllCities()
  }, [])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const handleCityDialog = () => {
    setOpen(true);
  }
  const cityDialog = () => {
    return (
      <div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={
            {
              style: { borderRadius: 20 }
            }
          }
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {"Select Your city"}

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

          </DialogTitle>
          <Divider />
          <DialogContent style={{ width: 350 }}>
            <List>
              <div>Top Cities</div>
              {showTopList()}
              <div>Other Cities</div>
              {showOtherList()}
            </List>


          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  const handleStartTimeOpen = () => {

  }

  const handleSetStartTimeValue = (newValue) => {

    //  setStartTime(newValue)
    //setStOpen(false)
    setStartTime(newValue)
  }

  const handleSetEndTimeValue = (newValue) => {


    setEndTime(newValue)
    dateDiff(newValue)

  }
  const dateDiff=(et)=>{
    var startDay = new Date(startTime);
    var endDay = new Date(et);

    var diff = new DateDiff(endDay, startDay);
 setDaysTime("Duration  "+parseInt(diff.days())+" Days "+parseInt(diff.hours()%24)+" Hrs "+parseInt(diff.minutes()%60)+" Minutes ")
    /*  *****we can also use this ***
    var millisecondsPerDay = 1000 * 60 * 60 * 24;

    var millisBetween = endDay.getTime() - startDay.getTime();
    var days = millisBetween / millisecondsPerDay;
    setDaysTime(Math.round(days));*/

  }

  return (

    <div style={{ position: 'relative' }}>
      <img src="/assets/slide1.png" style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', left: '3%', top: '8%' }} >

        <Paper elevation={3} style={{ display: 'flex', padding: 20, alignItems: 'center', borderRadius: 10, width: 500, height: 460, flexDirection: 'column' }} >
          <div style={{ position: 'relative', background: '#f39c12', width: 500, height: 90, borderRadius: 15 }}>
            <div style={{ position: 'absolute', left: '5%', top: '15%' }}>
              <div style={{ position: 'relative' }} >
                <img src="/assets/message.png" style={{ width: 220, height: 85 }} />
                <div style={{ position: 'absolute', left: '30%', top: 0, fontSize: 24, fontWeight: 'bolder' }}>
                  Rental
                </div>
                <div style={{ position: 'absolute', left: '18%', top: '32%', fontSize: 18, fontWeight: 500, color: '#7f8c8d' }}>
                  For hours & days
                </div>
              </div>
            </div>

            <div style={{ position: 'absolute', left: '50%', top: '8%' }}>
              <div style={{ width: 220, height: 85, padding: 5, display: 'flex', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: 24, fontWeight: 'bolder', color: '#fff' }}> Subscriptions</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}> For month & Year </div>
              </div>
            </div>
          </div>


          <div>
            <img src="/assets/Rentals2.png" style={{ width: 120, marginTop: '20%' }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#7f8c8d', marginTop: '1%' }}>
            Self drive car rental in india
          </div>

          <div onClick={handleCityDialog} style={{ cursor: 'pointer', marginTop: '5%', alignItems: 'center', padding: 10, display: 'flex', width: 400, height: 40, borderRadius: 15, border: '1px solid #bdc3c7' }}>
            <LocationOn />
            <span style={{ paddingLeft: 20, fontSize: 18, fontWeight: 600 }}>{selectedCity}</span>
          </div>

          <div style={{ display: "flex", width: 420, justifyContent: 'space-between' }}>
            <div onClick={handleStartTimeOpen} style={{ cursor: 'pointer', marginTop: '5%', alignItems: 'center', padding: 10, display: 'flex', width: 180, height: 40, borderRadius: 15, border: '1px solid #bdc3c7' }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <MobileDateTimePicker
                  label={<span style={{ fontSize: 18, fontWeight: 600, color: '#7f8c8d', paddingLeft: 40 }}>Start Time</span>}
                  value={startTime}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(newValue) => { handleSetStartTimeValue(newValue) }}

                  renderInput={(params) => <TextField variant="standard" {...params} />}
                />
              </LocalizationProvider>

            </div>
            <div onClick={handleStartTimeOpen} style={{ cursor: 'pointer', marginTop: '5%', alignItems: 'center', padding: 10, display: 'flex', width: 180, height: 40, borderRadius: 15, border: '1px solid #bdc3c7' }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>

                <MobileDateTimePicker
                  label={<span style={{ fontSize: 18, fontWeight: 600, color: '#7f8c8d', paddingLeft: 40 }}>End Time</span>}
                  value={endTime}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  onChange={(newValue) => { handleSetEndTimeValue(newValue) }}
                  renderInput={(params) => <TextField variant="standard" {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div style={{marginTop:15,fontSize: 16, fontWeight: 400, color: '#7f8c8d'}}>
            {daysTime}
          </div>
          <div style={{ display:'flex',justifyContent:'center', cursor: 'pointer', marginTop: '5%', alignItems: 'center', padding: 10, display: 'flex', width: 400, height: 40, borderRadius: 30,background:'#f39c12' }}>
            <span style={{fontSize: 24, fontWeight: 'bolder', color: '#fff'}}>Search</span>
          </div>
        </Paper>
      </div>
      {cityDialog()}

    </div>

  )

}