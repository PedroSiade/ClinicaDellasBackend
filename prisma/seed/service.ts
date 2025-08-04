import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Service = {
  name: string;
  iconUrl?: string;
  imageUrl?: string;
  summary: string;
  description?: string;
};

const servicesData: Service[] = [
  {
    name: "Consulta Ginecológica de Rotina",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    summary:
      "Exame preventivo completo para manutenção da saúde feminina, incluindo Papanicolau e exame clínico das mamas.",
    description: `## Consulta Ginecológica de Rotina

A consulta ginecológica de rotina é fundamental para a manutenção da saúde feminina. Durante o atendimento, realizamos uma avaliação completa que inclui:

### O que está incluído:
- **Anamnese detalhada** - Histórico médico e sintomas
- **Exame físico geral** - Avaliação do estado geral de saúde
- **Exame ginecológico** - Inspeção e palpação dos órgãos reprodutivos
- **Papanicolau** - Coleta para prevenção do câncer de colo do útero
- **Exame clínico das mamas** - Detecção precoce de alterações
- **Orientações preventivas** - Contraceptivos, higiene íntima e prevenção de ISTs

### Frequência recomendada:
- **Anual** para mulheres saudáveis
- **Semestral** em casos específicos conforme orientação médica

### Preparação para o exame:
- Evite relações sexuais 48h antes
- Não use duchas vaginais ou medicamentos locais
- Evite o período menstrual

A prevenção é o melhor cuidado com sua saúde!`,
  },
  {
    name: "Pré-natal Completo",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
    imageUrl:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop",
    summary:
      "Acompanhamento médico especializado durante toda a gestação para garantir saúde da mãe e do bebê.",
    description: `## Pré-natal Completo

O pré-natal é essencial para uma gestação saudável e segura. Oferecemos acompanhamento completo desde o início da gravidez até o parto.

### Serviços incluídos:
- **Consultas mensais** até 28 semanas, quinzenais até 36 semanas, semanais até o parto
- **Exames laboratoriais** completos em cada trimestre
- **Ultrassonografias** de rotina e especializadas
- **Orientações nutricionais** para gestantes
- **Preparação para o parto** e amamentação
- **Acompanhamento de intercorrências** como diabetes gestacional e hipertensão

### Benefícios:
- Detecção precoce de complicações
- Redução de riscos para mãe e bebê
- Orientação especializada em cada fase
- Suporte emocional durante a gestação

Cuidamos de você e do seu bebê com todo carinho e profissionalismo.`,
  },
  {
    name: "Planejamento Familiar",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1979/1979774.png",
    imageUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop",
    summary:
      "Orientação personalizada sobre métodos contraceptivos e planejamento reprodutivo adequado ao seu perfil.",
    description: `## Planejamento Familiar

Oferecemos orientação completa e personalizada para ajudar você a tomar decisões conscientes sobre sua vida reprodutiva.

### Métodos contraceptivos disponíveis:
- **Anticoncepcionais orais** - Pílulas combinadas e mini-pílulas
- **DIU** - Hormonal (Mirena) e de cobre
- **Implantes hormonais** - Proteção por 3 anos
- **Injetáveis** - Mensal e trimestral
- **Métodos de barreira** - Preservativos, diafragma
- **Contracepção de emergência** - Pílula do dia seguinte

### Para quem deseja engravidar:
- Orientação pré-concepcional
- Suplementação adequada
- Investigação de fertilidade
- Acompanhamento especializado

### Avaliação personalizada:
Consideramos seu histórico médico, estilo de vida e preferências para indicar o método mais adequado.

Sua escolha, nossa orientação especializada!`,
  },
  {
    name: "Colposcopia",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2755/2755014.png",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    summary:
      "Exame especializado para avaliação detalhada do colo do útero quando há alterações no Papanicolau.",
    description: `## Colposcopia

A colposcopia é um exame especializado que permite a visualização ampliada e detalhada do colo do útero, vagina e vulva.

### Quando é indicada:
- **Papanicolau alterado** - Investigação de lesões
- **Sangramento anormal** - Fora do período menstrual
- **Lesões visíveis** no colo do útero
- **Acompanhamento de tratamentos** anteriores
- **Infecções persistentes** por HPV

### Como é realizado:
1. **Posicionamento** similar ao exame ginecológico
2. **Aplicação de soluções** para melhor visualização
3. **Exame com colposcópio** - microscópio especial
4. **Biópsia** se necessário (pequeno fragmento)
5. **Resultado** em 7-10 dias

### Preparação:
- Evite relações sexuais 48h antes
- Não use medicamentos vaginais
- Evite período menstrual
- Venha com acompanhante se desejar

Procedimento seguro e indolor para sua tranquilidade e saúde.`,
  },
  {
    name: "Tratamento de Miomas",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913425.png",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop",
    summary:
      "Diagnóstico e tratamento especializado de miomas uterinos com opções conservadoras e cirúrgicas.",
    description: `## Tratamento de Miomas

Os miomas uterinos são tumores benignos muito comuns. Oferecemos diagnóstico preciso e tratamentos personalizados.

### Sintomas dos miomas:
- **Sangramento menstrual intenso** ou prolongado
- **Dor pélvica** ou pressão abdominal
- **Aumento do volume abdominal**
- **Dificuldade para engravidar**
- **Sintomas urinários** (urgência, frequência)

### Opções de tratamento:

#### **Tratamento medicamentoso:**
- Hormônios para controle de sangramento
- Anti-inflamatórios para dor
- Suplementação de ferro se necessário

#### **Procedimentos minimamente invasivos:**
- **Embolização** - Bloqueio da irrigação sanguínea
- **Ablação endometrial** - Para sangramentos intensos
- **MRgFUS** - Ultrassom focalizado guiado por ressonância

#### **Cirurgia:**
- **Miomectomia** - Remoção apenas dos miomas
- **Histerectomia** - Em casos específicos

### Avaliação personalizada:
Cada caso é único. Avaliamos tamanho, localização e sintomas para indicar o melhor tratamento.

Recupere sua qualidade de vida com tratamento especializado!`,
  },
  {
    name: "Menopausa e Reposição Hormonal",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2228/2228581.png",
    imageUrl:
      "https://images.unsplash.com/photo-1628681014799-c74a250a824c?w=600&h=400&fit=crop",
    summary:
      "Acompanhamento especializado durante a menopausa com opções de terapia de reposição hormonal personalizada.",
    description: `## Menopausa e Reposição Hormonal

A menopausa é uma fase natural da vida feminina que merece atenção e cuidado especializado para manter qualidade de vida.

### Sintomas da menopausa:
- **Ondas de calor** e sudorese noturna
- **Irregularidade menstrual** e cessação
- **Alterações do humor** e irritabilidade
- **Ressecamento vaginal** e diminuição da libido
- **Distúrbios do sono** e cansaço
- **Ganho de peso** e alterações metabólicas

### Terapia de Reposição Hormonal (TRH):

#### **Benefícios:**
- Alívio dos fogachos e suores
- Melhora da qualidade do sono
- Proteção cardiovascular
- Prevenção da osteoporose
- Melhora da função sexual

#### **Modalidades disponíveis:**
- **Estrogênio + Progesterona** - Para útero preservado
- **Estrogênio isolado** - Pós-histerectomia
- **Via oral, transdérmica ou vaginal**
- **Hormônios bioidênticos**

### Avaliação pré-TRH:
- Exames hormonais completos
- Avaliação cardiovascular
- Densitometria óssea
- Mamografia e ultrassom

### Acompanhamento personalizado:
Monitoramos regularmente para ajustar doses e garantir segurança.

Viva a menopausa com qualidade e bem-estar!`,
  },
  {
    name: "Ultrassom Ginecológico",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913334.png",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    summary:
      "Exame de imagem não invasivo para avaliação dos órgãos reprodutivos femininos internos.",
    description: `## Ultrassom Ginecológico

O ultrassom ginecológico é um exame de imagem fundamental para avaliação da saúde reprodutiva feminina.

### Tipos de ultrassom:

#### **Ultrassom Pélvico (Abdominal):**
- Realizado sobre o abdome
- Bexiga cheia necessária
- Visão geral dos órgãos pélvicos

#### **Ultrassom Transvaginal:**
- Sonda inserida na vagina
- Maior precisão e detalhamento
- Bexiga vazia
- Melhor para útero e ovários

### O que avalia:
- **Útero** - Tamanho, posição, miomas, pólipos
- **Ovários** - Cistos, tumores, ovulação
- **Endométrio** - Espessura, alterações
- **Trompas** - Quando dilatadas ou alteradas
- **Pelve** - Líquido livre, aderências

### Indicações:
- Dor pélvica crônica ou aguda
- Sangramento uterino anormal
- Suspeita de cistos ovarianos
- Acompanhamento de miomas
- Investigação de infertilidade
- Controle de tratamentos

### Preparação:
- **Pélvico:** Bexiga cheia (1 litro de água 1h antes)
- **Transvaginal:** Bexiga vazia
- Evite gases (dieta no dia anterior)

Exame seguro, indolor e sem radiação.`,
  },
  {
    name: "Cirurgia Ginecológica Minimamente Invasiva",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2785/2785482.png",
    imageUrl:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
    summary:
      "Procedimentos cirúrgicos por videolaparoscopia e histeroscopia com rápida recuperação.",
    description: `## Cirurgia Ginecológica Minimamente Invasiva

Oferecemos cirurgias modernas com técnicas minimamente invasivas para menor trauma e recuperação mais rápida.

### Videolaparoscopia:

#### **Procedimentos realizados:**
- **Laqueadura tubária** - Esterilização definitiva
- **Miomectomia** - Remoção de miomas
- **Cistectomia ovariana** - Remoção de cistos
- **Endometriose** - Tratamento de focos
- **Histerectomia** - Remoção do útero
- **Investigação de infertilidade**

#### **Vantagens:**
- Pequenas incisões (0,5 a 1,2cm)
- Menor dor pós-operatória
- Recuperação mais rápida
- Menor risco de infecção
- Cicatrizes mínimas
- Alta hospitalar precoce

### Histeroscopia:

#### **Procedimentos:**
- **Polipectomia** - Remoção de pólipos
- **Miomectomia** - Miomas submucosos
- **Sinequiotomia** - Aderências uterinas  
- **Septoplastia** - Correção de septo uterino
- **Ablação endometrial** - Sangramento excessivo

#### **Benefícios:**
- Acesso pela vagina (sem cortes)
- Anestesia local ou sedação
- Ambulatorial na maioria dos casos
- Retorno às atividades em 2-3 dias

### Pré e pós-operatório completo:
Acompanhamento desde a indicação até a recuperação total.

Tecnologia avançada para sua segurança e bem-estar!`,
  },
  {
    name: "Tratamento de Endometriose",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2785/2785524.png",
    imageUrl:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop",
    summary:
      "Diagnóstico e tratamento especializado da endometriose com abordagem multidisciplinar para controle da dor.",
    description: `## Tratamento de Endometriose

A endometriose é uma condição em que o tecido endometrial cresce fora do útero, causando dor e outros sintomas. Oferecemos tratamento especializado e personalizado.

### Sintomas da endometriose:
- **Dor pélvica intensa** durante a menstruação
- **Cólicas severas** que pioram com o tempo
- **Dor durante relações sexuais**
- **Dor ao urinar ou evacuar** durante a menstruação
- **Sangramento menstrual excessivo**
- **Dificuldade para engravidar**
- **Fadiga e náuseas** durante o período menstrual

### Diagnóstico:
- **Anamnese detalhada** e exame físico
- **Ultrassom especializado** com preparo intestinal
- **Ressonância magnética** quando necessária
- **Laparoscopia diagnóstica** - padrão ouro
- **Marcadores séricos** (CA-125)

### Opções de tratamento:

#### **Tratamento medicamentoso:**
- **Anticoncepcionais** - Uso contínuo
- **Progestágenos** - DIU Mirena, implantes
- **Análogos do GnRH** - Supressão hormonal
- **Anti-inflamatórios** - Controle da dor

#### **Tratamento cirúrgico:**
- **Laparoscopia** - Remoção dos focos
- **Ressecção de aderências**
- **Neurectomia pré-sacral** - Para dor central
- **Cirurgia de fertilidade** - Preservação da função reprodutiva

### Abordagem multidisciplinar:
- Ginecologista especialista
- Nutricionista
- Psicóloga
- Fisioterapeuta pélvica

### Acompanhamento personalizado:
Plano de tratamento individualizado considerando idade, sintomas, desejo reprodutivo e qualidade de vida.

Não aceite a dor como normal. A endometriose tem tratamento!`,
  },
  {
    name: "Saúde Sexual e Reprodutiva",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3004/3004543.png",
    imageUrl:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
    summary:
      "Orientação especializada sobre sexualidade feminina, disfunções sexuais e bem-estar íntimo.",
    description: `## Saúde Sexual e Reprodutiva

A sexualidade é parte fundamental da saúde e bem-estar feminino. Oferecemos atendimento especializado e sem tabus.

### Disfunções sexuais femininas:

#### **Diminuição da libido:**
- Investigação de causas hormonais
- Avaliação psicológica
- Tratamento medicamentoso quando indicado
- Terapia de casal

#### **Dispareunia (dor durante relação):**
- **Causas físicas:** Ressecamento vaginal, infecções, endometriose
- **Causas psicológicas:** Ansiedade, traumas
- **Tratamento:** Lubrificantes, hormonioterapia, terapia

#### **Vaginismo:**
- Contração involuntária dos músculos vaginais
- Fisioterapia pélvica especializada
- Dessensibilização gradual
- Suporte psicológico

### Problemas íntimos comuns:

#### **Infecções recorrentes:**
- **Candidíase** - Tratamento e prevenção
- **Vaginose bacteriana** - Restauração da flora
- **Infecções urinárias** - Investigação e profilaxia

#### **Alterações vaginais:**
- Ressecamento (menopausa, amamentação)
- Atrofia vulvovaginal
- Laser vaginal CO2
- Hidratantes e lubrificantes específicos

### Orientações especializadas:
- **Higiene íntima adequada**
- **Prevenção de ISTs**
- **Métodos contraceptivos** e efeitos na libido
- **Sexualidade na gestação** e puerpério
- **Sexualidade na menopausa**

### Atendimento humanizado:
Ambiente acolhedor e profissionais capacitados para abordar questões íntimas com naturalidade e respeito.

Sua intimidade merece cuidado especializado!`,
  },
];

async function main() {
  console.log("Starting to seed services...");

  // Clear existing services (optional - remove if you want to keep existing data)
  await prisma.service.deleteMany({});

  // Create services
  for (const service of servicesData) {
    const created = await prisma.service.create({
      data: {
        ...service,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(`Created service: ${created.name}`);
  }

  console.log(`Successfully seeded ${servicesData.length} services!`);
}

main()
  .catch((e) => {
    console.error("Error seeding services:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
