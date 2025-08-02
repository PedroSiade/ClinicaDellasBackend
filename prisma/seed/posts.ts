import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Article = {
  title: string;
  description: string;
  content: string;
  featuredImage: string;
  professionalId: number;
};

const professionalId = 16;

const articlesData: Article[] = [
  {
    title: "A importância das consultas ginecológicas regulares",
    description:
      "Entenda por que manter suas consultas em dia é essencial para a saúde feminina e prevenção de doenças.",
    content:
      "## Por que manter as consultas em dia?\n\nEntenda por que manter suas consultas em dia é essencial para a saúde feminina e prevenção de doenças. As visitas regulares ao ginecologista ajudam na detecção precoce de diversas condições, além de promoverem o bem-estar geral da mulher.\n\n![Consulta médica](https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop)\n\n### Benefícios das consultas regulares\n\n- **Detecção precoce** de doenças como câncer de colo do útero e de mama\n- Acompanhamento da saúde reprodutiva\n- Orientações sobre contracepção e prevenção de ISTs\n- Controle de alterações hormonais\n- Avaliação de sintomas e desconfortos\n\n### Exames importantes por faixa etária\n\n#### Dos 18 aos 30 anos\n1. Papanicolau anual\n2. Exame clínico das mamas\n3. Avaliação contraceptiva\n\n#### Dos 30 aos 50 anos\n1. Mamografia a partir dos 40 anos\n2. Densitometria óssea (se necessário)\n3. Controle hormonal\n\n## Quando procurar um ginecologista?\n\nO ideal é realizar consultas **pelo menos uma vez ao ano**, ou conforme orientação médica. Mudanças no ciclo menstrual, dor pélvica, ou qualquer sintoma incomum devem ser avaliados o quanto antes.\n\n> **Importante:** Não espere sentir algo errado para procurar um especialista. A prevenção é sempre o melhor caminho.\n\n### Links úteis\n\n- [Ministério da Saúde - Saúde da Mulher](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher)\n- [INCA - Prevenção do Câncer de Colo do Útero](https://www.inca.gov.br/tipos-de-cancer/cancer-do-colo-do-utero)\n\n## Cuide da sua saúde!\n\nNão espere sentir algo errado para procurar um especialista. A prevenção é sempre o melhor caminho. 💙\n\n---",
    featuredImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
    professionalId,
  },
  {
    title: "Reposição hormonal: quando e por que considerar?",
    description:
      "A terapia de reposição hormonal pode ser uma aliada na menopausa. Entenda os riscos e benefícios.",
    content:
      "## O que é reposição hormonal?\n\nA reposição hormonal consiste na administração de hormônios que deixam de ser produzidos pelo corpo feminino durante a menopausa.\n\n### Benefícios\n- Redução de fogachos e suores noturnos\n- Melhora da saúde óssea\n- Ganho de qualidade de vida\n\n### Riscos e cuidados\nAntes de iniciar a TRH, é fundamental fazer exames e uma avaliação com um especialista.\n\n> Sempre busque orientação médica.",
    featuredImage:
      "https://images.unsplash.com/photo-1628681014799-c74a250a824c?w=600",
    professionalId,
  },
  {
    title: "A importância da saúde intestinal para o bem-estar da mulher",
    description:
      "O intestino impacta diretamente no humor, imunidade e saúde hormonal.",
    content:
      "## Por que o intestino importa?\n\nO intestino é chamado de 'segundo cérebro'. Além da digestão, ele está diretamente ligado ao sistema imunológico e à produção de neurotransmissores.\n\n### Como melhorar a saúde intestinal?\n- Consuma fibras diariamente\n- Hidrate-se\n- Use probióticos naturais\n- Evite industrializados e açúcares\n\n### Dica:\nUma dieta equilibrada melhora a absorção de nutrientes e reduz inflamações crônicas.",
    featuredImage:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600",
    professionalId,
  },
  {
    title: "Como se preparar para sua primeira consulta ginecológica",
    description:
      "Dúvidas e inseguranças são normais. Veja como tornar esse momento mais leve.",
    content:
      "## Primeira consulta ginecológica\n\nMuitas mulheres se sentem inseguras. O atendimento deve ser acolhedor e respeitoso.\n\n### O que esperar:\n- Avaliação clínica e anamnese\n- Orientações sobre higiene íntima, menstruação e contracepção\n- Realização de exames preventivos, se necessário\n\n> Vá com roupas confortáveis e leve seu cartão SUS ou convênio.",
    featuredImage:
      "https://images.unsplash.com/photo-1588776814546-bbe3b1cbbbcf?w=600",
    professionalId,
  },
  {
    title: "5 alimentos que ajudam a equilibrar os hormônios naturalmente",
    description:
      "Inclua esses alimentos no seu dia a dia e veja os benefícios.",
    content:
      "## Equilíbrio hormonal através da alimentação\n\nAlguns alimentos possuem compostos bioativos que auxiliam na regulação hormonal.\n\n### Exemplos:\n- **Linhaça**: rica em lignanas e ômega-3\n- **Abacate**: gorduras boas e vitamina E\n- **Brócolis**: ajuda na desintoxicação do fígado\n- **Ovos**: fonte de colesterol bom, essencial para produção hormonal\n- **Frutas vermelhas**: antioxidantes naturais",
    featuredImage:
      "https://images.unsplash.com/photo-1612197524494-94d139dc66e0?w=600",
    professionalId,
  },
  {
    title: "Cuidados essenciais durante o período menstrual",
    description: "Veja como melhorar seu bem-estar durante a menstruação.",
    content:
      "## Dicas para o período menstrual\n\nCuidar do corpo e da mente durante o ciclo é fundamental.\n\n### Recomendações:\n- Use absorventes de boa qualidade ou coletores\n- Evite alimentos ultraprocessados\n- Pratique atividades leves como caminhada ou ioga\n- Hidrate-se bem\n\n> Se notar dores intensas ou sangramentos anormais, procure seu ginecologista.",
    featuredImage:
      "https://images.unsplash.com/photo-1619603360601-3a67468778f3?w=600",
    professionalId,
  },
  {
    title: "Check-up feminino: quais exames devo fazer?",
    description:
      "Exames de rotina são a melhor forma de cuidar da saúde preventiva.",
    content:
      "## Check-up anual\n\nA consulta de rotina com o ginecologista permite detectar precocemente doenças e desequilíbrios.\n\n### Principais exames:\n- Papanicolau\n- Mamografia (a partir dos 40 anos)\n- Ultrassom transvaginal\n- Exames hormonais\n- Colesterol, glicemia e outros laboratoriais",
    featuredImage:
      "https://images.unsplash.com/photo-1588776814358-557b1db13438?w=600",
    professionalId,
  },
  {
    title: "Saúde mental feminina: por que priorizar o cuidado emocional",
    description:
      "Entenda como hormônios e emoções estão conectados no corpo da mulher.",
    content:
      "## Saúde emocional importa\n\nA oscilação hormonal pode afetar diretamente o humor, energia e autoestima da mulher.\n\n### Dicas:\n- Durma bem\n- Faça terapia\n- Pratique atividade física\n- Reduza redes sociais tóxicas\n- Cultive boas relações\n\n> Cuidar da mente também é autocuidado.",
    featuredImage:
      "https://images.unsplash.com/photo-1612336307420-7e2c6211c4ae?w=600",
    professionalId,
  },
  {
    title: "Implantes hormonais: tudo que você precisa saber",
    description:
      "Alternativa prática e eficaz para quem busca controle hormonal de longo prazo.",
    content:
      "## O que são implantes hormonais?\n\nSão pequenos bastões inseridos sob a pele que liberam hormônios de forma contínua.\n\n### Benefícios:\n- Diminuição da TPM\n- Controle de acne hormonal\n- Redução de cólicas menstruais\n\n### Cuidados:\n- Aplicação deve ser feita por médico habilitado\n- Necessita acompanhamento regular\n- Pode causar efeitos colaterais em alguns casos",
    featuredImage:
      "https://images.unsplash.com/photo-1628471381381-07b2ae140537?w=600",
    professionalId,
  },
  {
    title: "Alimentação saudável na gravidez: o que priorizar",
    description:
      "Nutrição adequada durante a gestação é fundamental para mãe e bebê.",
    content:
      "## Nutrição na gravidez\n\nDurante a gestação, as necessidades nutricionais aumentam significativamente.\n\n### Nutrientes essenciais:\n- **Ácido fólico**: previne defeitos do tubo neural\n- **Ferro**: previne anemia\n- **Cálcio**: desenvolvimento ósseo do bebê\n- **Ômega-3**: desenvolvimento cerebral\n\n### O que evitar:\n- Álcool\n- Peixes com alto teor de mercúrio\n- Carnes cruas ou mal passadas\n- Queijos não pasteurizados\n\n> Sempre consulte seu obstetra e nutricionista para orientações personalizadas.",
    featuredImage:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
    professionalId,
  },
];

async function main() {
  console.log("Starting to seed articles...");

  await prisma.post.deleteMany({});

  // Create articles
  for (const article of articlesData) {
    const created = await prisma.post.create({
      data: {
        ...article,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(
      `Created article: ${created.title} (Professional ID: ${created.professionalId})`,
    );
  }

  console.log(`Successfully seeded ${articlesData.length} articles!`);
}

main()
  .catch((e) => {
    console.error("Error seeding articles:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
