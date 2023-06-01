  import React from 'react';
  import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

  // Create functional components for CV sections
  const EducationSection = ({ education }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Education</Text>
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{education.degree}</Text>
      <Text style={styles.itemSubtitle}>-{education.institution}</Text>
      <Text style={styles.itemSubtitle}>-{education.year}</Text>
      <Text style={styles.itemSubtitle}>-{education.DegStatus}</Text>
    </View>
  </View>
  );

  const WorkExperienceSection = ({ workExperience }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Work Experience</Text>
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{workExperience.position}</Text>
      <Text style={styles.itemSubtitle}>-{workExperience.company}</Text>
      <Text style={styles.itemSubtitle}>-{workExperience.duration}</Text>
    </View>
  </View>
  );

  const SkillsSection = ({ skills }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Skills</Text>
    <View style={styles.itemContainer}>
    {skills.map((skill, index) => (
    <Text key={index} style={styles.skill}>*{skill}</Text>
    ))}
    </View>
    </View>
  );

  const ContactSection = ({ contact }) => (
    <View style={styles.sectionContainer}>
     <Text style={styles.sectionTitle}>Contact</Text>
    <View style={styles.itemContainer}>
      <Text style={styles.itemSubtitle}>Email: {contact.email}</Text>
      <Text style={styles.itemSubtitle}>Phone: {contact.phone}</Text>
    </View>
  </View>
  );

  // Create the CV component
  const CV = ({ cvData }) => (
  <Document>
    <Page style={styles.page}>
    <View style={styles.container}>
      <Text style={styles.title}>{cvData.name}</Text>
    <EducationSection education={cvData.education} />
    <WorkExperienceSection workExperience={cvData.workExperience} />
    <SkillsSection skills={cvData.skills} />
    <ContactSection contact={cvData.contact} />
    </View>
    </Page>
  </Document>
  );

  // Styling
  const styles = StyleSheet.create({
    page: {
    fontFamily: 'Helvetica',
    border: "1px solid black",
    backgroundColor: '#FBFAF0',
  },
  container: {
    margin: '10%',
    border: "1px solid black",
    borderRadius: 10,
    height:"90%",
    padding: 3,
    backgroundColor:'#FFFFFF'
   
  },
  title: {
    padding: 3,
    // backgroundColor: '#FFE5EC',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',

    textAlign: 'center', // Added textAlign property to center the title
  },
  sectionContainer: {
    padding: 3,
    marginBottom: 20,
    marginLeft: 5
  },
  sectionTitle: {
    padding: 3,
    backgroundColor: '#f0f0f0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    marginLeft:"80px"
  },
  itemContainer: {
    padding: 3,
    marginBottom: 10,
    marginLeft: 20, // Added marginLeft property to create an indent
  },
  itemTitle: {
    padding: 3,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemSubtitle: {
    padding: 3,
    fontSize: 14,
    color: '#555',
    marginLeft:10,
    backgroundColor: '#E5F3FD',
    borderRadius: 10,
  },
  skill: {
    backgroundColor: '#E5F6DF',
    padding:3,
    fontSize: 14,
    color: '#333',
    borderRadius: 10,
    display: 'inline-block',
},
});

// Render the CV component and provide a download link
export const CV_data = ({ cvData }) => (
  <div>
    <PDFDownloadLink document={<CV cvData={cvData} />} fileName="cv.pdf">
      {({ blob, url, loading }) =>
        loading ? 'Generating PDF...' : <a href={url} target="_blank">Click Here To Download Your Auto Generated CV</a>
      }
    </PDFDownloadLink>
  </div>
);