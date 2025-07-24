import {PrismaClient, Role} from '@prisma/client'


const prisma = new PrismaClient()

type Professionals = {
    name: string
    email: string
    phone: string
    photoUrl: string
    description: string
    biography: string
    role: Role
}

const professionalsData : Professionals[] = [
    // DOCTORS
    {
        name: "Dr. Sarah Martinez",
        email: "sarah.martinez@clinic.com",
        phone: "+1 (555) 123-4567",
        photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        description: "Board-certified family physician with 12 years of experience in comprehensive primary care, preventive medicine, and chronic disease management.",
        biography: "Dr. Sarah Martinez is a dedicated family physician who has been serving our community for over a decade. She completed her medical degree at Johns Hopkins University and her residency in Family Medicine at Mayo Clinic. Dr. Martinez specializes in comprehensive primary care for patients of all ages, with particular expertise in preventive medicine, diabetes management, and women's health. She believes in building long-term relationships with her patients and takes a holistic approach to healthcare, considering not just physical symptoms but also mental and social well-being. Dr. Martinez is fluent in both English and Spanish, allowing her to better serve our diverse patient population. She is known for her compassionate bedside manner and her ability to explain complex medical conditions in terms that patients can easily understand.",
        role: Role.DOCTOR
    },
    {
        name: "Dr. Michael Chen",
        email: "michael.chen@clinic.com",
        phone: "+1 (555) 234-5678",
        photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
        description: "Internal medicine specialist focusing on cardiovascular health, hypertension management, and preventive care for adults.",
        biography: "Dr. Michael Chen brings 15 years of expertise in internal medicine to our clinic. After earning his medical degree from Stanford University, he completed his residency in Internal Medicine at UCSF Medical Center. Dr. Chen has a special interest in cardiovascular health and has helped hundreds of patients manage conditions such as hypertension, high cholesterol, and heart disease. He is particularly passionate about preventive care and works closely with patients to develop lifestyle modification programs that reduce their risk of chronic diseases. Dr. Chen stays current with the latest medical research and incorporates evidence-based practices into his patient care. He is also actively involved in medical education, regularly mentoring medical students and residents. His patients appreciate his thorough approach to diagnosis and his commitment to involving them in their treatment decisions.",
        role: Role.DOCTOR
    },
    {
        name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@clinic.com",
        phone: "+1 (555) 345-6789",
        photoUrl: "https://images.unsplash.com/photo-1594824475317-d9b3c6b7a4d8?w=400&h=400&fit=crop&crop=face",
        description: "Pediatrician specializing in child development, immunizations, and adolescent health with a warm, child-friendly approach.",
        biography: "Dr. Emily Rodriguez is a board-certified pediatrician who has dedicated her career to ensuring the health and well-being of children and adolescents. She graduated from Harvard Medical School and completed her pediatric residency at Boston Children's Hospital. With 10 years of experience, Dr. Rodriguez provides comprehensive care from newborn through teenage years, including routine check-ups, immunizations, developmental assessments, and treatment of acute and chronic conditions. She has special training in adolescent medicine and is skilled at addressing the unique physical and emotional needs of teenagers. Dr. Rodriguez is known for her patient and gentle approach with children, often using games and storytelling to make medical visits less intimidating. She works closely with parents and caregivers to provide education about child development, nutrition, and safety. Her goal is to help every child reach their full potential while maintaining optimal health.",
        role: Role.DOCTOR

    },

    // NUTRITIONISTS
    {
        name: "Isabella Thompson",
        email: "isabella.thompson@clinic.com",
        phone: "+1 (555) 456-7890",
        photoUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
        description: "Registered dietitian specializing in diabetes management, weight loss, and sports nutrition with personalized meal planning expertise.",
        biography: "Isabella Thompson is a Registered Dietitian Nutritionist (RDN) with a Master's degree in Nutritional Sciences from Cornell University. With 8 years of clinical experience, she specializes in helping patients achieve their health goals through evidence-based nutrition interventions. Isabella has extensive experience working with individuals with diabetes, helping them understand carbohydrate counting, meal timing, and blood sugar management. She also works with patients seeking sustainable weight loss, focusing on behavioral changes and realistic lifestyle modifications rather than restrictive dieting. Additionally, Isabella provides sports nutrition counseling for athletes and active individuals, helping them optimize their performance through proper fueling strategies. She believes that nutrition should be enjoyable and sustainable, and she works with each patient to develop personalized meal plans that fit their lifestyle, preferences, and cultural background. Isabella is certified in intuitive eating and takes a non-diet approach to wellness.",
        role: Role.NUTRITIONIST

    },
    {
        name: "Marcus Johnson",
        email: "marcus.johnson@clinic.com",
        phone: "+1 (555) 567-8901",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        description: "Clinical nutritionist focused on heart-healthy diets, digestive disorders, and plant-based nutrition for chronic disease prevention.",
        biography: "Marcus Johnson is a Clinical Nutritionist with a passion for using food as medicine to prevent and manage chronic diseases. He holds a Master's degree in Clinical Nutrition from New York University and has been practicing for 7 years. Marcus specializes in cardiovascular nutrition, helping patients with heart disease, high blood pressure, and high cholesterol make dietary changes that can significantly improve their health outcomes. He also has expertise in gastrointestinal nutrition, working with patients who have IBS, Crohn's disease, celiac disease, and other digestive disorders to identify trigger foods and develop healing nutrition plans. Marcus is a strong advocate for plant-based nutrition and has helped many patients successfully transition to more plant-forward diets for health and environmental reasons. He conducts regular nutrition workshops at the clinic and in the community, educating people about the connection between diet and health. His approach is practical and compassionate, recognizing that changing eating habits can be challenging and requiring ongoing support.",
        role: Role.NUTRITIONIST
    },

    // PSYCHOLOGISTS
    {
        name: "Dr. Rachel Kim",
        email: "rachel.kim@clinic.com",
        phone: "+1 (555) 678-9012",
        photoUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
        description: "Licensed clinical psychologist specializing in anxiety disorders, depression, and cognitive behavioral therapy for adults and adolescents.",
        biography: "Dr. Rachel Kim is a licensed clinical psychologist with a Ph.D. in Clinical Psychology from UCLA. With 11 years of experience, she specializes in treating anxiety disorders, depression, and trauma-related conditions in both adults and adolescents. Dr. Kim is extensively trained in cognitive behavioral therapy (CBT), dialectical behavior therapy (DBT), and mindfulness-based interventions. She has a particular interest in helping young adults navigate life transitions, relationship challenges, and career-related stress. Dr. Kim also has specialized training in treating anxiety disorders, including generalized anxiety, social anxiety, panic disorder, and phobias. She uses evidence-based treatments and works collaboratively with her clients to develop coping strategies and tools for long-term mental wellness. Dr. Kim creates a safe, non-judgmental environment where clients feel comfortable exploring their thoughts and feelings. She believes in the importance of cultural sensitivity and has experience working with diverse populations. Her goal is to help each client develop resilience and lead a more fulfilling life.",
        role: Role.PSYCHOLOGIST
    },
    {
        name: "Dr. James Wilson",
        email: "james.wilson@clinic.com",
        phone: "+1 (555) 789-0123",
        photoUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
        description: "Child and family psychologist specializing in behavioral issues, autism spectrum disorders, and family therapy with 14 years of experience.",
        biography: "Dr. James Wilson is a licensed psychologist specializing in child and family therapy with over 14 years of clinical experience. He earned his Ph.D. in Child Psychology from the University of Chicago and completed specialized training in autism spectrum disorders and developmental disabilities. Dr. Wilson works with children ages 3-18 and their families, addressing a wide range of concerns including behavioral problems, ADHD, autism spectrum disorders, learning disabilities, and emotional regulation difficulties. He is skilled in various therapeutic approaches including play therapy, family systems therapy, and applied behavior analysis (ABA). Dr. Wilson also provides comprehensive psychological evaluations for children suspected of having developmental or learning differences. He believes strongly in involving families in the therapeutic process and provides parent training and support to help families develop effective strategies for managing challenging behaviors at home. Dr. Wilson is known for his patience, creativity in engaging young clients, and his ability to help families understand and support their children's unique needs.",
        role: Role.PSYCHOLOGIST
    },

    // PHYSIOTHERAPISTS
    {
        name: "Lisa Anderson",
        email: "lisa.anderson@clinic.com",
        phone: "+1 (555) 890-1234",
        photoUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face",
        description: "Licensed physical therapist specializing in orthopedic rehabilitation, sports injuries, and post-surgical recovery with manual therapy expertise.",
        biography: "Lisa Anderson is a Doctor of Physical Therapy (DPT) with 9 years of experience helping patients recover from injuries and improve their physical function. She graduated from the University of Southern California's DPT program and has since specialized in orthopedic physical therapy and sports medicine. Lisa works with patients recovering from a wide variety of conditions including joint replacements, ACL repairs, rotator cuff injuries, back pain, and other musculoskeletal conditions. She is certified in manual therapy techniques and uses hands-on treatments combined with therapeutic exercise to help patients achieve optimal outcomes. Lisa has additional training in dry needling and is certified in the Selective Functional Movement Assessment (SFMA). She works with athletes of all levels, from weekend warriors to competitive athletes, helping them return to their sport safely and prevent future injuries. Lisa believes in educating her patients about their condition and empowering them to take an active role in their recovery. Her treatment plans are individualized and focus on not just treating symptoms but addressing underlying movement patterns and imbalances.",
        role: "PHYSIOTHERAPIST"
    },
    {
        name: "David Park",
        email: "david.park@clinic.com",
        phone: "+1 (555) 901-2345",
        photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
        description: "Physical therapist focusing on neurological rehabilitation, stroke recovery, and balance disorders with specialized vestibular training.",
        biography: "David Park is a licensed physical therapist with specialized expertise in neurological rehabilitation. He holds a Doctor of Physical Therapy degree from Northwestern University and has completed advanced training in neurological conditions including stroke, spinal cord injury, multiple sclerosis, and Parkinson's disease. With 12 years of experience, David helps patients with neurological conditions regain function, improve mobility, and enhance their quality of life. He is particularly skilled in gait training, balance rehabilitation, and vestibular therapy for patients with dizziness and balance disorders. David uses evidence-based treatments including task-specific training, constraint-induced movement therapy, and neuromuscular re-education. He is certified in LSVT BIG, a specialized exercise program for people with Parkinson's disease. David works closely with patients and their families to set realistic goals and develop comprehensive treatment plans that address both physical and functional needs. He is passionate about helping his patients achieve their maximum potential and maintain their independence. His patient and encouraging approach has helped many individuals successfully navigate the challenges of neurological recovery.",
        role: Role.PHYSIOTHERAPIST
    },

    // OWNER
    {
        name: "Dr. Amanda Foster",
        email: "amanda.foster@clinic.com",
        phone: "+1 (555) 012-3456",
        photoUrl: "https://images.unsplash.com/photo-1551836022-d5c7b1d5b7c0?w=400&h=400&fit=crop&crop=face",
        description: "Clinic owner and practicing family physician with 20+ years of experience, dedicated to providing comprehensive, patient-centered healthcare.",
        biography: "Dr. Amanda Foster is the founder and owner of our clinic, bringing over 20 years of medical experience and a vision for comprehensive, patient-centered care. She earned her medical degree from Harvard Medical School and completed her residency in Family Medicine at Massachusetts General Hospital. After practicing in various healthcare settings, Dr. Foster was inspired to open her own clinic to create an environment where patients receive personalized, unhurried care from a team of dedicated professionals. As both owner and practicing physician, she is actively involved in patient care while also overseeing the clinic's operations and ensuring the highest standards of medical excellence. Dr. Foster specializes in family medicine, women's health, and preventive care, but her greatest passion lies in building a healthcare team that treats the whole person, not just symptoms. Under her leadership, the clinic has grown to include specialists in nutrition, psychology, and physical therapy, reflecting her belief in integrated, multidisciplinary care. Dr. Foster is committed to staying current with medical advances and regularly attends conferences and continuing education programs. She is known in the community for her advocacy for accessible healthcare and her involvement in local health initiatives.",
        role: Role.OWNER
    }
]

async function main() {
    console.log('Starting to seed professionals...')

    // Clear existing professionals (optional - remove if you want to keep existing data)
    await prisma.professional.deleteMany({})

    // Create professionals
    for (const professional of professionalsData) {
        const created = await prisma.professional.create({
            data: professional
        })
        console.log(`Created professional: ${created.name} (${created.role})`)
    }

    console.log(`Successfully seeded ${professionalsData.length} professionals!`)
}

main()
    .catch((e) => {
        console.error('Error seeding professionals:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })