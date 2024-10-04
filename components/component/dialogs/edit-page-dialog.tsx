// import React, { useEffect, useRef, useState } from 'react';
// import Button from '@/components/component/buttons/button';
// import PageContent from '@/components/interface/page-content';
// import EditDataCard from '@/components/component/edit-data-card/edit-data-card';
// import { ButtonType } from '@/components/enums/button-type-enum';
// import { GraphBoxType } from '@/components/enums/graph-box-enum';
// import {
//     AlbumDataFields,
//     DataBaseOrigin,
// } from '@/components/enums/data-types-enum';
// import { DataCardType } from '@/components/enums/data-card-type-enum';
// import { AddCircleSVG } from '@/components/component/svg-icons/svg-icons';
// import {
//     DragDropContext,
//     Droppable,
//     Draggable,
//     DropResult,
// } from 'react-beautiful-dnd';

// interface EditDialogProps {
//     closeDialog: () => void;
//     submitDialog: (page: PageContent) => void;
//     page: PageContent;
// }

// function dataType(length: number) {
//     switch (length) {
//         case 0:
//             return DataCardType.SIMPLE;
//         case 1:
//             return DataCardType.SIMPLE_GRAPH;
//     }
//     return DataCardType.MULTIPLE_GRAPH;
// }

// const PageEditDialog: React.FC<EditDialogProps> = ({
//     closeDialog,
//     submitDialog,
//     page,
// }) => {
//     const dialogRef = useRef<HTMLDivElement>(null);
//     const [editPage, setEditPage] = useState<PageContent>(page);

//     useEffect(() => {
//         const handleEsc = (event: KeyboardEvent) => {
//             if (event.keyCode === 27) {
//                 closeDialog();
//             }
//         };

//         const handleClickOutside = (event: MouseEvent) => {
//             if (
//                 dialogRef.current &&
//                 !dialogRef.current.contains(event.target as Node)
//             ) {
//                 closeDialog();
//             }
//         };

//         window.addEventListener('keydown', handleEsc);
//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             window.removeEventListener('keydown', handleEsc);
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [closeDialog]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setEditPage((prev) => (prev ? { ...prev, [name]: value } : prev));
//     };

//     const handleCardChange = (index: number, field: string, value: string) => {
//         if (!editPage) return;
//         const updatedCards = [...editPage.cards];
//         updatedCards[index] = { ...updatedCards[index], [field]: value };
//         setEditPage({ ...editPage, cards: updatedCards });
//     };

//     const handleGraphDataChange = (
//         cardIndex: number,
//         graphIndex: number,
//         field: string,
//         value: any,
//         yValue: boolean = false,
//     ) => {
//         if (!editPage) return;

//         const updatedCards = [...editPage.cards];
//         const updatedGraphData = [...updatedCards[cardIndex].graphData];
//         let newDonne = [...updatedGraphData[graphIndex].donnes]; // Ensure this is a new array copy

//         if (field === 'donnes') {
//             if (yValue) {
//                 newDonne[1] = value;
//             } else {
//                 newDonne[0] = value;
//             }
//             updatedGraphData[graphIndex] = {
//                 ...updatedGraphData[graphIndex],
//                 donnes: newDonne,
//             };
//         } else if (field === 'graphType') {
//             if (
//                 (value === GraphBoxType.STACKED_BARCHART ||
//                     value === GraphBoxType.DOUBLE_HORIZONTAL_BARCHART) &&
//                 updatedGraphData[graphIndex].graphType !==
//                     GraphBoxType.STACKED_BARCHART &&
//                 updatedGraphData[graphIndex].graphType !==
//                     GraphBoxType.DOUBLE_HORIZONTAL_BARCHART
//             ) {
//                 // Switching to stacked or double bar chart, add a new value if it doesn't already exist
//                 if (newDonne.length === 1) {
//                     newDonne.push(AlbumDataFields.ANNEE_FONDATION);
//                 }
//             } else if (
//                 value !== GraphBoxType.STACKED_BARCHART &&
//                 value !== GraphBoxType.DOUBLE_HORIZONTAL_BARCHART &&
//                 (updatedGraphData[graphIndex].graphType ===
//                     GraphBoxType.STACKED_BARCHART ||
//                     updatedGraphData[graphIndex].graphType ===
//                         GraphBoxType.DOUBLE_HORIZONTAL_BARCHART)
//             ) {
//                 // Switching from stacked or double bar chart to a single value chart, remove the second value
//                 if (newDonne.length > 1) {
//                     newDonne.pop();
//                 }
//             }
//             updatedGraphData[graphIndex] = {
//                 ...updatedGraphData[graphIndex],
//                 donnes: newDonne,
//                 graphType: value,
//             };
//         } else {
//             updatedGraphData[graphIndex] = {
//                 ...updatedGraphData[graphIndex],
//                 [field]: value,
//             };
//         }

//         updatedCards[cardIndex] = {
//             ...updatedCards[cardIndex],
//             type: dataType(updatedGraphData.length),
//             graphData: updatedGraphData,
//         };

//         setEditPage({ ...editPage, cards: updatedCards });
//     };

//     const handleGraphOrderChange = (cardIndex: number, newOrder: any[]) => {
//         if (!editPage) return;
//         const updatedCards = [...editPage.cards];
//         updatedCards[cardIndex] = {
//             ...updatedCards[cardIndex],
//             graphData: newOrder,
//             type: dataType(newOrder.length),
//         };
//         setEditPage({ ...editPage, cards: updatedCards });
//     };

//     function handleGraphDelete(e: any, cardIndex: number, graphIndex: number) {
//         e.preventDefault();
//         if (!editPage) return;
//         const updatedCards = [...editPage.cards];
//         const updatedGraphData = updatedCards[cardIndex].graphData.filter(
//             (graph, index) => index !== graphIndex,
//         );
//         updatedCards[cardIndex] = {
//             ...updatedCards[cardIndex],
//             type: dataType(updatedGraphData.length),
//             graphData: updatedGraphData,
//         };

//         setEditPage({ ...editPage, cards: updatedCards });
//     }

//     function handleGraphAdd(e: any, cardIndex: number) {
//         e.preventDefault();
//         if (!editPage) return;
//         const updatedCards = [...editPage.cards];
//         let updatedGraphData = [...updatedCards[cardIndex].graphData];
//         if (updatedGraphData) {
//             updatedGraphData.push({
//                 graphType: GraphBoxType.DOUGHNUT,
//                 donnes: [AlbumDataFields.ANNEE_FONDATION],
//             });
//         } else {
//             updatedGraphData = [
//                 {
//                     graphType: GraphBoxType.DOUGHNUT,
//                     donnes: [AlbumDataFields.ANNEE_FONDATION],
//                 },
//             ];
//         }

//         updatedCards[cardIndex] = {
//             ...updatedCards[cardIndex],
//             graphData: updatedGraphData,
//             type: dataType(updatedGraphData.length),
//         };

//         setEditPage({ ...editPage, cards: updatedCards });
//     }

//     function handleSectionDelete(e: any, cardIndex: number) {
//         e.preventDefault();
//         if (!editPage) return;
//         let updatedCards = [...editPage.cards];
//         if (updatedCards) {
//             updatedCards = updatedCards.filter(
//                 (card, index) => index !== cardIndex,
//             );
//         } else {
//             return;
//         }
//         setEditPage({ ...editPage, cards: updatedCards });
//     }

//     function handleSectionAdd(e: any) {
//         e.preventDefault();
//         if (!editPage) return;
//         const updatedCards = [...editPage.cards];

//         if (updatedCards) {
//             updatedCards.push({
//                 title: '',
//                 description: '',
//                 type: DataCardType.SIMPLE,
//                 graphData: [],
//             });
//         } else {
//             return;
//         }

//         setEditPage({ ...editPage, cards: updatedCards });
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         submitDialog(editPage);
//     };

//     const onDragEnd = (result: DropResult) => {
//         if (!result.destination) return;
//         const updatedCards = [...editPage.cards];
//         const [reorderedItem] = updatedCards.splice(result.source.index, 1);
//         updatedCards.splice(result.destination.index, 0, reorderedItem);

//         setEditPage({ ...editPage, cards: updatedCards });
//     };

//     return (
//         <div className="fixed z-40 h-[100%] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
//             <div
//                 ref={dialogRef}
//                 className="bg-white dark:bg-[#262626] p-2 rounded-lg shadow-2xl w-[80%] h-[95%] relative space-y-8"
//             >
//                 {editPage && (
//                     <div className="w-full h-[90%] overflow-y-auto flex flex-col">
//                         <form className="w-full flex flex-col">
//                             <label className="block font-normal dark:text-white ml-[6%] text-md">
//                                 Titre
//                             </label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={editPage.title}
//                                 onChange={handleInputChange}
//                                 className="rounded-md shadow-sm mb-2 p-1 w-[90%] ml-[5%] dark:text-white text-sm dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <label className="block font-normal dark:text-white ml-[6%] text-md">
//                                 Description
//                             </label>
//                             <input
//                                 type="text"
//                                 name="description"
//                                 value={editPage.description}
//                                 onChange={handleInputChange}
//                                 className="rounded-md shadow-sm mb-4 p-1 w-[90%] ml-[5%] dark:text-white text-sm dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <label className="block mb-1 font-normal dark:text-white ml-[6%] text-md">
//                                 Sections d`&apos;` information
//                             </label>
//                             <div>
//                                 <DragDropContext onDragEnd={onDragEnd}>
//                                     <Droppable droppableId="dataCards">
//                                         {(provided) => (
//                                             <div
//                                                 {...provided.droppableProps}
//                                                 ref={provided.innerRef}
//                                                 className="flex flex-wrap justify-center items-center"
//                                             >
//                                                 {editPage.cards.map(
//                                                     (card, index) => (
//                                                         <Draggable
//                                                             key={index}
//                                                             draggableId={String(
//                                                                 index,
//                                                             )}
//                                                             index={index}
//                                                         >
//                                                             {(provided) => (
//                                                                 <div
//                                                                     ref={
//                                                                         provided.innerRef
//                                                                     }
//                                                                     {...provided.draggableProps}
//                                                                     {...provided.dragHandleProps}
//                                                                     className="m-2 w-[90%] flex flex-col justify-center items-center"
//                                                                 >
//                                                                     <EditDataCard
//                                                                         key={
//                                                                             index
//                                                                         }
//                                                                         card={
//                                                                             card
//                                                                         }
//                                                                         cardIndex={
//                                                                             index
//                                                                         }
//                                                                         handleCardChange={
//                                                                             handleCardChange
//                                                                         }
//                                                                         handleGraphDataChange={
//                                                                             handleGraphDataChange
//                                                                         }
//                                                                         handleGraphDelete={
//                                                                             handleGraphDelete
//                                                                         }
//                                                                         handleGraphAdd={
//                                                                             handleGraphAdd
//                                                                         }
//                                                                         handleSectionDelete={
//                                                                             handleSectionDelete
//                                                                         }
//                                                                         handleGraphOrderChange={
//                                                                             handleGraphOrderChange
//                                                                         }
//                                                                         tabType={
//                                                                             DataBaseOrigin.ALBUM_FAMILLE
//                                                                         }
//                                                                     />
//                                                                 </div>
//                                                             )}
//                                                         </Draggable>
//                                                     ),
//                                                 )}
//                                                 {provided.placeholder}
//                                             </div>
//                                         )}
//                                     </Droppable>
//                                 </DragDropContext>

//                                 <Button
//                                     onClick={(e) => handleSectionAdd(e)}
//                                     buttonType={ButtonType.ICON}
//                                     className="w-[90%] m-[5%] mt-6 mb-8 flex justify-center items-center"
//                                 >
//                                     <AddCircleSVG className="fill-black dark:fill-white"></AddCircleSVG>
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>
//                 )}

//                 <div className="absolute flex justify-center space-x-20 bottom-4 w-full">
//                     <Button
//                         onClick={handleSubmit}
//                         buttonType={ButtonType.CONFIRM}
//                     >
//                         Confirmer
//                     </Button>
//                     <Button
//                         onClick={closeDialog}
//                         buttonType={ButtonType.CANCEL}
//                     >
//                         Annuler
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PageEditDialog;
