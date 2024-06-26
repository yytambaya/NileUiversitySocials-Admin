import { Button, Grid, TextField } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext/authContext"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import { Form, Modal } from "react-bootstrap"

export const BlogModal = ({
  show,
  handleModal,
  blogFunction,
  modalTitle,
  blog,
}) => {
  const authContext = useContext(AuthContext)
  const [uploadFile, setUploadFile] = useState(null)
  const [preview, setPreview] = useState(blog === undefined ? "" : blog.picture)
  const [content, setContent] = useState(blog === undefined ? "" : blog.content)
  const [title, setTitle] = useState(blog === undefined ? "" : blog.title)
  const [date, setDate] = useState(blog === undefined ? "" : blog.date)
  const [time, setTime] = useState(blog === undefined ? "" : blog.time)
  const [location, setLocation] = useState(blog === undefined ? "" : blog.location)
  const [titleError, setTitleError] = useState("")
  const [contentError, setContentError] = useState("")
  const [dateError, setDateError] = useState("")
  const [timeError, setTimeError] = useState("")
  const [locationError, setLocationError] = useState("")

  console.log(preview)
  const handleForm = async (e) => {
    e.preventDefault()
    if(title != "" && content != "" && date != "" && time != "" && location != ""){
      const formData = new FormData()
      formData.append("user", authContext.user._id)
      formData.append("title", title)
      formData.append("content", content)
      formData.append("date", date)
      formData.append("time", time)
      formData.append("location", location)
      
      formData.append("picture", uploadFile)
      blog
        ? blogFunction(formData, authContext.user._id, blog._id)
        : blogFunction(formData, authContext.user._id)
      handleModal()
    }else{
        if(title == ""){
          setTitleError("invalid title")
        } 
        if(content == ""){
          setContentError("invalid description")
        } 
        if(date == ""){
          setDateError("invalid date")
        }
        if(time == ""){
          setTimeError("invalid time")
        }
        if(location == ""){
          setLocationError("invalid location")
        }
    }
  }
  const styleTheme =
    authContext.theme === "dark"
      ? { background: "#121212", color: "whitesmoke" }
      : null
  const styleThemeMain =
    authContext.theme === "dark" ? { background: "rgb(0 0 0 / 88%)" } : null

  return (
    <Modal
      show={show}
      onHide={handleModal}
      centered
      size="lg"
      id="input-modal"
      style={styleThemeMain}
    >
      <Modal.Header closeButton style={styleTheme}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={styleTheme}>
        <form onSubmit={handleForm}>
          <Grid container justify="space-between" direction="row" spacing={3}>
            <Grid item container direction="column" md={6}>
              <Grid item>
                <TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="title"
                  size="small"
                  value={title}
                  fullWidth
                  onChange={(e) => setTitle(e.target.value)}
                /> 
                {titleError && <p className="text-danger">{titleError}</p>}


                <TextField
                  className="mb-3"
                  rows={5}
                  fullWidth
                  multiline
                  variant="outlined"
                  placeholder="description of event"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
              {contentError && <p className="text-danger">{contentError}</p>}



                {/*<TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="date"
                  size="small"
                  value={date}
                  fullWidth
                  onChange={(e) => setDate(e.target.value)}
                />*/}
                <Form.Control className=" bg-dark text-light" type="date" placeholder="date" value={date}  onChange={(e) => setDate(e.target.value)}/>
                <p className="mb-3">event date</p>
                {dateError && <p className="text-danger">{dateError}</p>}

                {/*<TextField
                  className="mb-3"
                  variant="outlined"
                  placeholder="time"
                  size="small"
                  value={time}
                  fullWidth
                  onChange={(e) => setTime(e.target.value)}
                />*/}
                <Form.Control className="bg-dark text-light" type="time" placeholder="date" value={time}  onChange={(e) => setTime(e.target.value)}/>
                <p className="mb-3">event time</p>
                {timeError && <p className="text-danger">{timeError}</p>}


                
                <TextField
                className="mb-3"
                variant="outlined"
                placeholder="location"
                size="small"
                value={location}
                fullWidth
                onChange={(e) => setLocation(e.target.value)}
              />
               {locationError && <p className="text-danger">{locationError}</p>}

              </Grid>
              {/*<Grid item>
                <Form.File
                  type="file"
                  onChange={(e) => {
                    setUploadFile(e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                  label="Upload media"
                  multiple
                />
              </Grid>*/}
            </Grid>
            {/*<Grid item md={6}>
              {uploadFile || preview ? (
                <img src={preview} alt="input file" width="100%" />
              ) : (
                <div
                  className="container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <AddPhotoAlternateIcon fontSize="large" />
                  <h6>Image Preview</h6>
                </div>
              )}
            </Grid>*/}
          </Grid>
        </form>
      </Modal.Body>
      <Modal.Footer style={styleTheme}>
        <Button size="small" onClick={handleModal}>
          Discard
        </Button>
        <Button type="submit" size="small" onClick={handleForm}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
