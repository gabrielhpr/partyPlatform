import { Button, Modal, ModalOverlay, ModalContent, Text,
    ModalHeader, ModalCloseButton, ModalFooter, ModalBody, useDisclosure, Flex, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { ImageGallery } from "./ImageGallery";
    
    interface ModalImageGalleryProps {
        buttonText: string;
        content: ReactNode;
    }
    
export function ModalImageGallery( {buttonText, content }: ModalImageGalleryProps ) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    console.log('content: ');
    console.log(content);

    return (
        <>
            <Button 
                bg='white'
                color='black'
                w='70%'
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, 80%)'
                onClick={onOpen}
            >
                {buttonText}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent alignItems='center'>
                    

                    <ModalCloseButton />
                    
                    <ModalBody>
                        
                        <ImageGallery
                            data={content}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>        
        </>
    );
}