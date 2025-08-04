import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

type Professionals = {
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  description: string;
  biography: string;
  role: Role;
};

const professionalsData: Professionals[] = [
  {
    name: "Dra. Sarah Martinez",
    email: "sarah.martinez@clinic.com",
    phone: "+1 (555) 123-4567",
    photoUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    description:
      "Médica de família certificada com 12 anos de experiência em cuidados primários abrangentes, medicina preventiva e gerenciamento de doenças crônicas.",
    biography:
      "A Dra. Sarah Martinez é uma médica de família dedicada que atende nossa comunidade há mais de uma década. Ela concluiu sua graduação em medicina na Universidade Johns Hopkins e sua residência em Medicina de Família na Mayo Clinic. A Dra. Martinez é especialista em cuidados primários abrangentes para pacientes de todas as idades, com especialização em medicina preventiva, controle de diabetes e saúde da mulher. Ela acredita na construção de relacionamentos de longo prazo com seus pacientes e adota uma abordagem holística para a saúde, considerando não apenas os sintomas físicos, mas também o bem-estar mental e social. A Dra. Martinez é fluente em inglês e espanhol, o que lhe permite atender melhor nossa diversificada população de pacientes. Ela é conhecida por sua maneira compassiva de tratar os pacientes e por sua habilidade de explicar condições médicas complexas em termos que os pacientes possam entender facilmente.",
    role: Role.DOCTOR,
  },
  {
    name: "Dr. Michael Chen",
    email: "michael.chen@clinic.com",
    phone: "+1 (555) 234-5678",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    description:
      "Especialista em medicina interna com foco em saúde cardiovascular, controle de hipertensão e cuidados preventivos para adultos.",
    biography:
      "O Dr. Michael Chen traz 15 anos de experiência em medicina interna para nossa clínica. Após obter seu diploma de médico na Universidade de Stanford, ele concluiu sua residência em Medicina Interna no UCSF Medical Center. O Dr. Chen tem um interesse especial em saúde cardiovascular e já ajudou centenas de pacientes a gerenciar condições como hipertensão, colesterol alto e doenças cardíacas. Ele é particularmente apaixonado por cuidados preventivos e trabalha em estreita colaboração com os pacientes para desenvolver programas de modificação de estilo de vida que reduzam o risco de doenças crônicas. O Dr. Chen se mantém atualizado com as mais recentes pesquisas médicas e incorpora práticas baseadas em evidências em seu atendimento ao paciente. Ele também está ativamente envolvido na educação médica, orientando regularmente estudantes de medicina e residentes. Seus pacientes apreciam sua abordagem completa para o diagnóstico e seu compromisso em envolvê-los em suas decisões de tratamento.",
    role: Role.DOCTOR,
  },
  {
    name: "Dra. Emily Rodriguez",
    email: "emily.rodriguez@clinic.com",
    phone: "+1 (555) 345-6789",
    photoUrl:
      "https://images.unsplash.com/photo-1594824475317-d9b3c6b7a4d8?w=400&h=400&fit=crop&crop=face",
    description:
      "Pediatra especializada em desenvolvimento infantil, imunizações e saúde do adolescente com uma abordagem acolhedora e amigável para crianças.",
    biography:
      "A Dra. Emily Rodriguez é uma pediatra certificada que dedicou sua carreira a garantir a saúde e o bem-estar de crianças e adolescentes. Ela se formou na Harvard Medical School e concluiu sua residência em pediatria no Boston Children's Hospital. Com 10 anos de experiência, a Dra. Rodriguez oferece cuidados abrangentes desde o recém-nascido até a adolescência, incluindo check-ups de rotina, imunizações, avaliações de desenvolvimento e tratamento de condições agudas e crônicas. Ela tem treinamento especial em medicina do adolescente e é hábil em abordar as necessidades físicas e emocionais únicas dos adolescentes. A Dra. Rodriguez é conhecida por sua abordagem paciente e gentil com as crianças, muitas vezes usando jogos e contação de histórias para tornar as visitas médicas menos intimidadoras. Ela trabalha em estreita colaboração com pais e cuidadores para fornecer educação sobre desenvolvimento infantil, nutrição e segurança. Seu objetivo é ajudar cada criança a atingir seu pleno potencial, mantendo uma saúde ótima.",
    role: Role.DOCTOR,
  },

  // NUTRICIONISTAS
  {
    name: "Isabella Thompson",
    email: "isabella.thompson@clinic.com",
    phone: "+1 (555) 456-7890",
    photoUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
    description:
      "Nutricionista registrada especializada em controle de diabetes, perda de peso e nutrição esportiva com experiência em planejamento de refeições personalizadas.",
    biography:
      "Isabella Thompson é uma Nutricionista Dietista Registrada (RDN) com mestrado em Ciências Nutricionais pela Universidade Cornell. Com 8 anos de experiência clínica, ela é especializada em ajudar os pacientes a alcançar suas metas de saúde por meio de intervenções nutricionais baseadas em evidências. Isabella tem vasta experiência trabalhando com indivíduos com diabetes, ajudando-os a entender a contagem de carboidratos, o tempo das refeições e o controle do açúcar no sangue. Ela também trabalha com pacientes que buscam perda de peso sustentável, focando em mudanças comportamentais e modificações realistas no estilo de vida, em vez de dietas restritivas. Além disso, Isabella oferece aconselhamento em nutrição esportiva para atletas e indivíduos ativos, ajudando-os a otimizar seu desempenho por meio de estratégias de alimentação adequadas. Ela acredita que a nutrição deve ser agradável e sustentável, e trabalha com cada paciente para desenvolver planos alimentares personalizados que se ajustem ao seu estilo de vida, preferências e histórico cultural. Isabella é certificada em alimentação intuitiva e adota uma abordagem não-dieta para o bem-estar.",
    role: Role.NUTRITIONIST,
  },
  {
    name: "Marcus Johnson",
    email: "marcus.johnson@clinic.com",
    phone: "+1 (555) 567-8901",
    photoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description:
      "Nutricionista clínico focado em dietas saudáveis para o coração, distúrbios digestivos e nutrição baseada em plantas para prevenção de doenças crônicas.",
    biography:
      "Marcus Johnson é um Nutricionista Clínico com paixão por usar alimentos como remédio para prevenir e gerenciar doenças crônicas. Ele possui mestrado em Nutrição Clínica pela Universidade de Nova York e pratica há 7 anos. Marcus é especializado em nutrição cardiovascular, ajudando pacientes com doenças cardíacas, pressão alta e colesterol alto a fazerem mudanças na dieta que podem melhorar significativamente seus resultados de saúde. Ele também tem experiência em nutrição gastrointestinal, trabalhando com pacientes que têm SII, doença de Crohn, doença celíaca e outros distúrbios digestivos para identificar alimentos desencadeantes e desenvolver planos de nutrição curativos. Marcus é um forte defensor da nutrição baseada em plantas e ajudou muitos pacientes a fazerem uma transição bem-sucedida para dietas mais vegetais por razões de saúde e ambientais. Ele realiza workshops de nutrição regularmente na clínica e na comunidade, educando as pessoas sobre a conexão entre dieta e saúde. Sua abordagem é prática e compassiva, reconhecendo que mudar os hábitos alimentares pode ser desafiador e requer apoio contínuo.",
    role: Role.NUTRITIONIST,
  },

  // PSICÓLOGOS
  {
    name: "Dra. Rachel Kim",
    email: "rachel.kim@clinic.com",
    phone: "+1 (555) 678-9012",
    photoUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    description:
      "Psicóloga clínica licenciada especializada em transtornos de ansiedade, depressão e terapia cognitivo-comportamental para adultos e adolescentes.",
    biography:
      "A Dra. Rachel Kim é uma psicóloga clínica licenciada com Ph.D. em Psicologia Clínica pela UCLA. Com 11 anos de experiência, ela é especializada no tratamento de transtornos de ansiedade, depressão e condições relacionadas a traumas em adultos e adolescentes. A Dra. Kim é extensivamente treinada em terapia cognitivo-comportamental (TCC), terapia comportamental dialética (TCD) e intervenções baseadas em mindfulness. Ela tem um interesse particular em ajudar jovens adultos a navegar por transições de vida, desafios de relacionamento e estresse relacionado à carreira. A Dra. Kim também possui treinamento especializado no tratamento de transtornos de ansiedade, incluindo ansiedade generalizada, ansiedade social, transtorno do pânico e fobias. Ela usa tratamentos baseados em evidências e trabalha em colaboração com seus clientes para desenvolver estratégias de enfrentamento e ferramentas para o bem-estar mental a longo prazo. A Dra. Kim cria um ambiente seguro e sem julgamentos, onde os clientes se sentem à vontade para explorar seus pensamentos e sentimentos. Ela acredita na importância da sensibilidade cultural e tem experiência em trabalhar com diversas populações. Seu objetivo é ajudar cada cliente a desenvolver resiliência e a levar uma vida mais gratificante.",
    role: Role.PSYCHOLOGIST,
  },
  {
    name: "Dr. James Wilson",
    email: "james.wilson@clinic.com",
    phone: "+1 (555) 789-0123",
    photoUrl:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
    description:
      "Psicólogo infantil e familiar especializado em questões comportamentais, transtornos do espectro do autismo e terapia familiar com 14 anos de experiência.",
    biography:
      "O Dr. James Wilson é um psicólogo licenciado especializado em terapia infantil e familiar com mais de 14 anos de experiência clínica. Ele obteve seu Ph.D. em Psicologia Infantil pela Universidade de Chicago e completou treinamento especializado em transtornos do espectro do autismo e deficiências de desenvolvimento. O Dr. Wilson trabalha com crianças de 3 a 18 anos e suas famílias, abordando uma ampla gama de preocupações, incluindo problemas de comportamento, TDAH, transtornos do espectro do autismo, dificuldades de aprendizagem e dificuldades de regulação emocional. Ele é habilidoso em várias abordagens terapêuticas, incluindo ludoterapia, terapia de sistemas familiares e análise do comportamento aplicada (ABA). O Dr. Wilson também fornece avaliações psicológicas abrangentes para crianças com suspeita de diferenças de desenvolvimento ou aprendizagem. Ele acredita firmemente no envolvimento das famílias no processo terapêutico e oferece treinamento e apoio aos pais para ajudá-los a desenvolver estratégias eficazes para gerenciar comportamentos desafiadores em casa. O Dr. Wilson é conhecido por sua paciência, criatividade em engajar jovens clientes e sua capacidade de ajudar as famílias a entender e apoiar as necessidades únicas de seus filhos.",
    role: Role.PSYCHOLOGIST,
  },

  // FISIOTERAPEUTAS
  {
    name: "Lisa Anderson",
    email: "lisa.anderson@clinic.com",
    phone: "+1 (555) 890-1234",
    photoUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face",
    description:
      "Fisioterapeuta licenciada especializada em reabilitação ortopédica, lesões esportivas e recuperação pós-cirúrgica com experiência em terapia manual.",
    biography:
      "Lisa Anderson é Doutora em Fisioterapia (DPT) com 9 anos de experiência ajudando pacientes a se recuperarem de lesões e a melhorarem sua função física. Ela se formou no programa de DPT da Universidade do Sul da Califórnia e desde então se especializou em fisioterapia ortopédica e medicina esportiva. Lisa trabalha com pacientes em recuperação de uma ampla variedade de condições, incluindo substituições de articulações, reparos de LCA, lesões do manguito rotador, dores nas costas e outras condições musculoesqueléticas. Ela é certificada em técnicas de terapia manual e usa tratamentos práticos combinados com exercícios terapêuticos para ajudar os pacientes a alcançar resultados ótimos. Lisa tem treinamento adicional em agulhamento a seco e é certificada na Avaliação Seletiva do Movimento Funcional (SFMA). Ela trabalha com atletas de todos os níveis, desde guerreiros de fim de semana até atletas competitivos, ajudando-os a retornar ao esporte com segurança e a prevenir futuras lesões. Lisa acredita em educar seus pacientes sobre sua condição e em capacitá-los a assumir um papel ativo em sua recuperação. Seus planos de tratamento são individualizados e focam não apenas no tratamento dos sintomas, mas também na abordagem de padrões de movimento e desequilíbrios subjacentes.",
    role: "PHYSIOTHERAPIST",
  },
  {
    name: "David Park",
    email: "david.park@clinic.com",
    phone: "+1 (555) 901-2345",
    photoUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    description:
      "Fisioterapeuta com foco em reabilitação neurológica, recuperação de AVC e distúrbios de equilíbrio com treinamento vestibular especializado.",
    biography:
      "David Park é um fisioterapeuta licenciado com especialização em reabilitação neurológica. Ele possui o título de Doutor em Fisioterapia pela Northwestern University e completou treinamento avançado em condições neurológicas, incluindo AVC, lesão medular, esclerose múltipla e doença de Parkinson. Com 12 anos de experiência, David ajuda pacientes com condições neurológicas a recuperar a função, melhorar a mobilidade e aprimorar sua qualidade de vida. Ele é particularmente habilidoso em treinamento de marcha, reabilitação de equilíbrio e terapia vestibular para pacientes com tontura e distúrbios de equilíbrio. David utiliza tratamentos baseados em evidências, incluindo treinamento específico para tarefas, terapia de movimento induzido por restrição e reeducação neuromuscular. Ele é certificado em LSVT BIG, um programa de exercícios especializado para pessoas com doença de Parkinson. David trabalha em estreita colaboração com os pacientes e suas famílias para definir metas realistas e desenvolver planos de tratamento abrangentes que atendam às necessidades físicas e funcionais. Ele é apaixonado por ajudar seus pacientes a atingir seu potencial máximo e manter sua independência. Sua abordagem paciente e encorajadora ajudou muitos indivíduos a superar com sucesso os desafios da recuperação neurológica.",
    role: Role.PHYSIOTHERAPIST,
  },

  // PROPRIETÁRIA
  {
    name: "Dra. Amanda Foster",
    email: "amanda.foster@clinic.com",
    phone: "+1 (555) 012-3456",
    photoUrl:
      "https://images.unsplash.com/photo-1551836022-d5c7b1d5b7c0?w=400&h=400&fit=crop&crop=face",
    description:
      "Proprietária da clínica e médica de família praticante com mais de 20 anos de experiência, dedicada a fornecer cuidados de saúde abrangentes e centrados no paciente.",
    biography:
      "A Dra. Amanda Foster é a fundadora e proprietária de nossa clínica, trazendo mais de 20 anos de experiência médica e uma visão de cuidados de saúde abrangentes e centrados no paciente. Ela obteve seu diploma de medicina na Harvard Medical School e completou sua residência em Medicina de Família no Massachusetts General Hospital. Depois de praticar em vários ambientes de saúde, a Dra. Foster foi inspirada a abrir sua própria clínica para criar um ambiente onde os pacientes recebam cuidados personalizados e sem pressa de uma equipe de profissionais dedicados. Como proprietária e médica praticante, ela está ativamente envolvida no atendimento ao paciente, ao mesmo tempo que supervisiona as operações da clínica e garante os mais altos padrões de excelência médica. A Dra. Foster é especialista em medicina de família, saúde da mulher e cuidados preventivos, mas sua maior paixão reside em construir uma equipe de saúde que trata a pessoa como um todo, não apenas os sintomas. Sob sua liderança, a clínica cresceu para incluir especialistas em nutrição, psicologia e fisioterapia, refletindo sua crença em cuidados integrados e multidisciplinares. A Dra. Foster está comprometida em se manter atualizada com os avanços da medicina e participa regularmente de conferências e programas de educação continuada. Ela é conhecida na comunidade por sua defesa do acesso à saúde e seu envolvimento em iniciativas locais de saúde.",
    role: Role.OWNER,
  },
];

async function main() {
  console.log("Starting to seed professionals...");

  // Clear existing professionals (optional - remove if you want to keep existing data)
  await prisma.professional.deleteMany({});

  // Create professionals
  for (const professional of professionalsData) {
    const created = await prisma.professional.create({
      data: professional,
    });
    console.log(`Created professional: ${created.name} (${created.role})`);
  }

  console.log(`Successfully seeded ${professionalsData.length} professionals!`);
}

main()
  .catch((e) => {
    console.error("Error seeding professionals:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
