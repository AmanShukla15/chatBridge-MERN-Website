import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
import { useDispatch, useSelector } from 'react-redux'
import { setIsNewGroup } from '../../redux/reducers/misc'

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();


  const groupName = useInputValidation("")

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {

    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  }

  const submitHandler = () => {
    console.log("submitHandler");
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack
        p={{
          xs: "1rem",
          sm: "3rem"
        }}
        width={"25rem"}
        spacing={"2rem"}
      >
        <DialogTitle
          textAlign={"center"}
          variant="h4"
        >
          New Groups
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant='body1'>
          Members
        </Typography>

        <Stack>
          {
            members.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>

      </Stack>
    </Dialog>
  )
}

export default NewGroup