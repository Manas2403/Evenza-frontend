// import React, { useState } from "react";
// import { Button } from "react-native";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import { BlobUtil, RNFetchBlob } from "react-native-blob-util";

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: "row",
//     },
//     section: {
//         flexGrow: 1,
//     },
// });

// const MyDocument = (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Hello World!</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>We're inside a PDF!</Text>
//             </View>
//         </Page>
//     </Document>
// );

// const PDFDownloadButton = () => {
//     const [isDownloading, setIsDownloading] = useState(false);

//     const downloadPDF = async () => {
//         setIsDownloading(true);

//         const pdfData = await MyDocument.toBlob();
//         const blobUtil = new BlobUtil(pdfData);
//         const filePath = await blobUtil.writeFile("my-pdf.pdf");

//         // Share the PDF document to the user
//         await RNFetchBlob.ios.openDocument(filePath);

//         setIsDownloading(false);
//     };

//     return (
//         <Button
//             className="w-full font-semibold text-lg bg-purple-200 border rounded-lg border-purple-400 "
//             title="Download PDF"
//             onPress={downloadPDF}
//             disabled={isDownloading}
//             Download
//             ID-Card
//         />
//     );
// };

// const App = () => {
//     return <PDFDownloadButton />;
// };

// export default App;
