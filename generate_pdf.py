import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

def fetch_leetcode_solved_count():
    import urllib.request
    import json
    try:
        url = 'https://leetcode-api-faisalshohag.vercel.app/Prasanna-1714'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            return data.get('totalSolved', 280)
    except Exception as e:
        print(f"Warning: Could not fetch live LeetCode stats for PDF: {e}")
        return 280

def create_resume():
    # Fetch live LeetCode stats
    leetcode_solved = fetch_leetcode_solved_count()
    
    # Make sure assets directory exists
    os.makedirs('assets', exist_ok=True)
    pdf_path = os.path.join('assets', 'Prasanna - Resume WEB.pdf')
    
    # Document Setup - Standard margins
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=35,
        bottomMargin=35
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Color Scheme (Slate & Electric Blue)
    PRIMARY_COLOR = colors.HexColor('#0f172a')  # Dark slate
    SECONDARY_COLOR = colors.HexColor('#ff6b4a')  # Coral accent
    TEXT_COLOR = colors.HexColor('#334155')  # Slate text
    
    # Custom styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY_COLOR,
        spaceAfter=3
    )
    
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=SECONDARY_COLOR,
        spaceAfter=6
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_COLOR,
        alignment=0
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=PRIMARY_COLOR,
        spaceBefore=8,
        spaceAfter=3
    )
    
    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11.5,
        textColor=PRIMARY_COLOR
    )
    
    item_subtitle = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=11,
        textColor=SECONDARY_COLOR
    )
    
    item_meta = ParagraphStyle(
        'ItemMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=10.5,
        textColor=TEXT_COLOR,
        alignment=2
    )
    
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_COLOR
    )

    story = []

    # 1. HEADER SECTION
    story.append(Paragraph("PRASANNA R", name_style))
    story.append(Paragraph("Aspiring Software Developer | Full-Stack Development & Java", title_style))
    
    contact_text = """
    <b>Puducherry, India</b> | <b>Email:</b> prasannaraja17032006@gmail.com | <b>Phone:</b> +91 7010185226 <br/>
    <b>LinkedIn:</b> linkedin.com/in/prasanna-17r | <b>LeetCode:</b> leetcode.com/Prasanna-1714 | <b>GitHub:</b> github.com/Prasanna-17-hub
    """
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 8))

    def add_section_divider(heading_text):
        story.append(Paragraph(heading_text, section_heading))
        t = Table([['']], colWidths=[532], rowHeights=[1.5])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), SECONDARY_COLOR),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(t)
        story.append(Spacer(1, 5))

    # 2. OBJECTIVE
    add_section_divider("CAREER OBJECTIVE")
    obj_text = "Aspiring Software Developer with a strong foundation in Java, Full-Stack Development, and problem-solving, seeking an entry-level opportunity to design, develop, and maintain scalable software applications. Passionate about building real-world solutions, learning emerging technologies, and contributing to organizational success while continuously enhancing technical skills."
    story.append(Paragraph(obj_text, body_style))
    story.append(Spacer(1, 6))

    # 3. EDUCATION
    add_section_divider("EDUCATION")
    edu_data = [
        [
            Paragraph("<b>Panimalar Engineering College, Chennai</b>", item_title),
            Paragraph("<b>2023 - 2027</b>", item_meta)
        ],
        [
            Paragraph("Bachelor of Technology in Computer Science and Business Systems (CSBS)", item_subtitle),
            Paragraph("CGPA: <b>8.6 / 10.0</b>", item_meta)
        ],
        [
            Paragraph("<b>Vidhya Niketan Hr Sec School, Puducherry</b>", item_title),
            Paragraph("<b>2022 - 2023</b>", item_meta)
        ],
        [
            Paragraph("HSC – Class XII", item_subtitle),
            Paragraph("Percentage: <b>78.16%</b>", item_meta)
        ]
    ]
    t_edu = Table(edu_data, colWidths=[380, 152])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_edu)
    story.append(Spacer(1, 6))

    # 4. TECHNICAL SKILLS
    add_section_divider("TECHNICAL SKILLS")
    skills_text = f"""
    <b>Programming Languages:</b> Java, JavaScript, Python (Basics), HTML, CSS <br/>
    <b>Frontend & Backend:</b> React.js, Node.js, Express.js <br/>
    <b>Databases & Core Concepts:</b> PostgreSQL, Object-Oriented Programming (OOP), Data Structures & Algorithms, REST APIs <br/>
    <b>Developer Tools:</b> Git, GitHub, VS Code, Postman <br/>
    <b>Problem Solving:</b> Solved <b>{leetcode_solved}+</b> coding problems on LeetCode
    """
    story.append(Paragraph(skills_text, body_style))
    story.append(Spacer(1, 6))

    # 5. PROJECTS
    add_section_divider("PROJECTS")
    
    # Project 1
    p1 = [
        [Paragraph("<b>Smart Trip Planner – Project</b>", item_title), Paragraph("<b>2025 – 2026</b>", item_meta)]
    ]
    t_p1 = Table(p1, colWidths=[380, 152])
    t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p1)
    story.append(Paragraph("Developed a full-stack AI-assisted travel itinerary planner using React (Vite), Node.js (Express), and PostgreSQL to generate personalized day-wise travel plans based on destination, budget, travel style, and companion type. Implemented proximity-based routing using Haversine formula, Leaflet maps, weather integration, budget analytics, PDF export, JWT & Google OAuth authentication, and an admin dashboard.", body_style))
    story.append(Spacer(1, 5))

    # Project 2
    p2 = [
        [Paragraph("<b>Music Application (Qspiders, Chennai)</b>", item_title), Paragraph("<b>Feb 2025 – Apr 2025</b>", item_meta)]
    ]
    t_p2 = Table(p2, colWidths=[380, 152])
    t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p2)
    story.append(Paragraph("Built a responsive web music player that allows users to play, pause, and navigate through tracks. Features include a user friendly interface and real-time audio control. Developed using HTML, CSS, and JavaScript. Hosted on Firebase and available on GitHub.", body_style))
    story.append(Spacer(1, 5))

    # Project 3
    p3 = [
        [Paragraph("<b>Quick Dictionary (Chrome Extension)</b>", item_title), Paragraph("<b>2025 – 2026</b>", item_meta)]
    ]
    t_p3 = Table(p3, colWidths=[380, 152])
    t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_p3)
    story.append(Paragraph("Developed a Chrome Extension using JavaScript (Manifest V3), HTML, and CSS that provides instant English word definitions through intelligent hover detection and manual search. Integrated Dictionary API, Web Speech API, and Shadow DOM for pronunciation, isolated tooltips, keyboard shortcuts, and Light/Dark themes.", body_style))
    story.append(Spacer(1, 6))

    # 6. EXPERIENCE / INTERNSHIP
    add_section_divider("EXPERIENCE / INTERNSHIP")
    exp_data = [
        [
            Paragraph("<b>Web Development Intern</b> | VaultofCodes", item_title),
            Paragraph("<b>1-Month Internship</b>", item_meta)
        ]
    ]
    t_exp = Table(exp_data, colWidths=[380, 152])
    t_exp.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_exp)
    story.append(Paragraph("Completed a one-month Web Development Internship at VaultofCodes, where I developed responsive web applications using modern web technologies and enhanced frontend development skills.", body_style))
    story.append(Spacer(1, 6))

    # 7. CERTIFICATES & LANGUAGES
    add_section_divider("CERTIFICATES & LANGUAGES")
    cert_text = """
    • <b>Web Development Course:</b> QSpiders, Chennai (Feb 2025)<br/>
    • <b>Basics of Machine Learning:</b> NPTEL SWAYAM (Oct 2025)<br/>
    • <b>Languages Spoken:</b> English (Fluent), Tamil (Native), French (Basics)
    """
    story.append(Paragraph(cert_text, body_style))

    # Build the document
    doc.build(story)
    print("Resume PDF successfully generated at: assets/Prasanna - Resume WEB.pdf")
    
    # Sync with public/assets if directory exists
    public_assets_dir = os.path.join('public', 'assets')
    if os.path.exists(public_assets_dir):
        import shutil
        dest_path = os.path.join(public_assets_dir, 'Prasanna - Resume WEB.pdf')
        shutil.copy2(pdf_path, dest_path)
        print(f"Synced Resume PDF to: {dest_path}")

if __name__ == '__main__':
    create_resume()
