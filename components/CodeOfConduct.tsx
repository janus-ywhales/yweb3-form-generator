import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Link, ListItem, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { LegalContext } from "../context/LegalContext";

export default function CodeOfConduct() {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClauses({
            ...clauses,
            [event.target.name]: event.target.checked
        })
    }

    const { clauses, setClauses } = useContext(LegalContext)
    const { codeOfConductClause } = clauses 

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        bgcolor: '#395B64',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <FormGroup className="w-3/4 flex justify-around">
            <FormLabel>Code of Conduct</FormLabel>
            <FormControlLabel
                control={<Checkbox checked={codeOfConductClause} onChange={handleChange} name="codeOfConductClause"/>}
                label={
                    <>
                        <span>I will abide by the yWhales </span>
                        <Link onClick={handleOpen}>Code of Conduct</Link>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" className="text-white" variant="h6" component="h2">
                                    yWhales Code of Conduct
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} paragraph>
                                    At yWhales we require that all of our Community Members conduct themselves according to the highest standards of ethics, integrity, and behavior:
                                </Typography>
                            <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Always respect member confidentiality.  All conversations and documents posted in yWhales ecosystem are to be treated as confidential unless given permission by the author otherwise.                                 </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Do not record or stream live events, voice and video chats without the permission of yWhales.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Refrain from any discriminatory, bullying or harassing behavior towards clients, members, yWhales management team and the general public.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Refrain from sensitive topics in discussions written or verbal.  Political, religious and sexual discussions are not permitted.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Be responsible.  yWhales, the website, live events, the forum and discussion boards are not financial, legal or fiscal advice. You are responsible for your own trading choices and tax liabilities.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Report any questionable content to yWhales moderators or staff immediately.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Be careful with your wallet addresses and token holdings.  No one in yWhales will EVER ask for your passwords or seed keys. Never give this information to anyone online for any reason.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Strive to respond to members in a timely matter.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    We encourage you to share upcoming Web3 projects, updates, and initiatives in the discord and within our community.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Refrain from spam posting or individual solicitation, unless invited to do so.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Promotion of other Discord channels is prohibited.  This includes any links to other Discord channels.
                                </ListItem>
                                <ListItem id="modal-modal-description" sx={{ mt: 1 }} style={{ display: 'list-item'}}>
                                    Do no make any statements to media about yWhales or community member’s business, unless expressly authorized to do so by yWhales or a community member.
                                </ListItem>
                                <Typography id="modal-modal-description" sx={{ mt: 1 }} paragraph>
                                    This is a safe space for everyone to learn this ever-evolving asset class together. Share your experiences, thoughts, and questions with the community - it helps everyone!
                                </Typography>
                            </Box>
                        </Modal>
                    </>
                }
                name="codeOfConductClause"
            />
        </FormGroup>
    )
}