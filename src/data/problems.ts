export interface Problem {
  id: string;
  titulo: string;
  descricao: string;
  causa: string;
  solucao: string;
  passos: string[];
  tags: string[];
  imagem?: string;
  video?: string;
  librasVideo?: string;
}

export interface Category {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  problemas: Problem[];
}

export const categories: Category[] = [
  {
    id: "hardware",
    nome: "Hardware",
    icone: "/src/assets/HARD-ICON.jpg",
    cor: "#3B82F6",
    problemas: [
      {
        id: "hw-1",
        titulo: "PC desliga sozinho",
        descricao: "O computador desliga sem aviso durante o uso",
        causa: "Fonte de alimentação com potência insuficiente ou superaquecimento do processador",
        solucao: "Calcule o consumo total dos componentes e substitua por uma fonte com certificação 80 Plus de potência adequada, ou verifique a pasta térmica do processador",
        passos: [
          "Desligue o computador da tomada",
          "Verifique se há acúmulo de poeira nos coolers",
          "Calcule a potência necessária (use calculadora online)",
          "Verifique a temperatura do processador com software como HWMonitor",
          "Se necessário, troque a pasta térmica",
          "Adquira fonte certificada 80 Plus com margem de 20%"
        ],
        tags: ["fonte", "energia", "desligamento", "superaquecimento", "temperatura"],
        video: "https://youtu.be/YBRq743Vl7c?si=mN1tp8TfCAi0T6bM",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "hw-2",
        titulo: "Fonte sem certificação gasta mais energia",
        descricao: "Fontes genéricas consomem mais energia e podem danificar componentes",
        causa: "Fontes sem certificação 80 Plus têm baixa eficiência energética e fornecem energia instável",
        solucao: "Substitua por uma fonte com certificação 80 Plus (White, Bronze, Silver, Gold ou Platinum)",
        passos: [
          "Identifique a potência necessária para seu PC",
          "Pesquise fontes com certificação 80 Plus",
          "Escolha uma marca confiável (Corsair, EVGA, Seasonic, etc.)",
          "Desligue e desconecte o PC da tomada",
          "Abra o gabinete e desconecte todos os cabos da fonte antiga",
          "Instale a nova fonte e reconecte todos os cabos"
        ],
        tags: ["fonte", "energia", "certificação", "80 plus", "economia"],
        video: "https://youtu.be/2joSGvvwgws?si=lOs-AsYS1qcyke62",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "hw-3",
        titulo: "PC não liga ao apertar o botão",
        descricao: "Nenhuma resposta ao pressionar o botão power",
        causa: "Pode ser problema na fonte, no botão power, na placa-mãe ou cabos desconectados",
        solucao: "Verifique a conexão elétrica, teste a fonte com o teste do clipe de papel e verifique os cabos internos",
        passos: [
          "Verifique se o cabo de força está bem conectado",
          "Teste a tomada com outro aparelho",
          "Verifique se a chave 110/220V está correta",
          "Abra o gabinete e verifique se os cabos da fonte estão conectados",
          "Faça o teste do clipe de papel na fonte (pino verde + preto)",
          "Se a fonte ligar, verifique o conector do botão power na placa-mãe"
        ],
        tags: ["não liga", "botão", "power", "fonte", "energia"],
        video: "https://youtu.be/gIOiyFVfl_8?si=WtvlF5q1b8Lo4MPs",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "hw-4",
        titulo: "USB não reconhece dispositivo",
        descricao: "Dispositivos USB não são detectados pelo computador",
        causa: "Driver desatualizado, porta USB danificada ou dispositivo com defeito",
        solucao: "Teste em outras portas, atualize drivers e verifique o gerenciador de dispositivos",
        passos: [
          "Teste o dispositivo em outra porta USB",
          "Teste outro dispositivo USB na mesma porta",
          "Reinicie o computador",
          "Acesse o Gerenciador de Dispositivos (Win + X)",
          "Procure por dispositivos com erro (ícone amarelo)",
          "Clique com botão direito e selecione 'Atualizar driver'",
          "Se persistir, desinstale o driver e reinicie"
        ],
        tags: ["usb", "dispositivo", "driver", "porta", "reconhecer"],
        video: "https://youtu.be/jkce-zoHxzw?si=iBMCO6SMOFxHt0xy",
        librasVideo: "https://www.youtube.com/watch?v=tRFcYAf5puI"
      },
      {
        id: "hw-5",
        titulo: "Montagem sem pulseira antiestática",
        descricao: "Risco de danificar componentes por descarga eletrostática",
        causa: "Eletricidade estática acumulada no corpo pode queimar circuitos sensíveis",
        solucao: "Use pulseira antiestática ou toque em metal aterrado antes de manusear componentes",
        passos: [
          "Adquira uma pulseira antiestática (custo baixo)",
          "Conecte a pulseira a uma superfície metálica aterrada",
          "Alternativamente, toque no gabinete metálico frequentemente",
          "Evite trabalhar em superfícies que geram estática (carpete, plástico)",
          "Manuseie componentes pelas bordas, evitando tocar circuitos",
          "Mantenha os componentes nas embalagens antiestáticas até o uso"
        ],
        tags: ["estática", "pulseira", "montagem", "componentes", "proteção"],
        video: "https://youtu.be/Wb1zgRLrsSY?si=GrGU3B5Easb8nIO7",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "hw-6",
        titulo: "Pendrive não inicia instalação (boot)",
        descricao: "O computador não inicia pelo pendrive para instalar sistema",
        causa: "Pendrive não está configurado como bootável ou BIOS não está configurada corretamente",
        solucao: "Use ferramentas como Rufus para criar pendrive bootável e configure a BIOS",
        passos: [
          "Baixe o Rufus (rufus.ie) no computador",
          "Baixe a ISO do sistema operacional desejado",
          "Conecte o pendrive (mínimo 8GB)",
          "Abra o Rufus e selecione o pendrive",
          "Selecione a ISO baixada",
          "Clique em 'Iniciar' e aguarde",
          "Reinicie o PC e pressione F2/F12/DEL para acessar BIOS",
          "Configure o pendrive como primeiro dispositivo de boot"
        ],
        tags: ["boot", "pendrive", "instalação", "bios", "rufus", "sistema"],
        video: "https://youtu.be/GZ9ECXGvvpU?si=PS-abVMz02dAAxAT",
        librasVideo: "https://www.youtube.com/watch?v=tRFcYAf5puI"
      },
      {
        id: "hw-7",
        titulo: "Cooler com muito barulho",
        descricao: "Ventoinhas fazendo ruído excessivo",
        causa: "Acúmulo de poeira, rolamento desgastado ou ventoinha desbalanceada",
        solucao: "Limpe as ventoinhas, lubrifique se necessário ou substitua",
        passos: [
          "Desligue o computador e desconecte da tomada",
          "Abra o gabinete",
          "Use ar comprimido para remover poeira dos coolers",
          "Verifique se há cabos encostando nas ventoinhas",
          "Se o barulho persistir, lubrifique o eixo com óleo de máquina",
          "Se não resolver, substitua o cooler por um novo"
        ],
        tags: ["cooler", "barulho", "ventoinha", "ruído", "poeira"],
        video: "https://youtu.be/vb1LF2Nya98?si=G8kEn1H_0u7EfepK",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "hw-8",
        titulo: "Arquivo grande não copia para pendrive FAT32",
        descricao: "Erro ao copiar arquivos maiores que 4GB para pendrive",
        causa: "Sistema de arquivos FAT32 tem limite de 4GB por arquivo",
        solucao: "Formate o pendrive para NTFS ou exFAT (compatível com Mac e Windows)",
        passos: [
          "Faça backup de todos os arquivos do pendrive",
          "Conecte o pendrive ao computador",
          "Abra 'Este Computador'",
          "Clique com botão direito no pendrive > Formatar",
          "Selecione 'NTFS' ou 'exFAT' como sistema de arquivos",
          "Clique em 'Iniciar' (isso apagará todos os dados)",
          "Após formatar, copie o arquivo grande novamente"
        ],
        tags: ["pendrive", "fat32", "ntfs", "arquivo grande", "formatar", "4gb"],
        video: "https://youtu.be/RilQibSv1c8?si=f981y3LrdaM5RHgu",
        librasVideo: "https://www.youtube.com/watch?v=tRFcYAf5puI"
      },
      {
        id: "hw-9",
        titulo: "Arquivos corrompidos",
        descricao: "Arquivos não abrem ou mostram erro de corrupção",
        causa: "Remoção incorreta de dispositivos, setores defeituosos ou falha de energia",
        solucao: "Use ferramentas de recuperação e verifique a integridade do disco",
        passos: [
          "Sempre use 'Remover Hardware com Segurança' antes de desconectar",
          "Execute o CHKDSK para verificar erros no disco",
          "Abra o Prompt de Comando como administrador",
          "Digite: chkdsk /f /r e pressione Enter",
          "Reinicie se solicitado",
          "Para recuperar arquivos, use Recuva ou TestDisk",
          "Considere fazer backup em nuvem regularmente"
        ],
        tags: ["corrompido", "arquivo", "recuperação", "chkdsk", "disco", "backup"],
        video: "https://youtu.be/K6hvwnckejE?si=eDOI1hmJEwmw7PCk",
        librasVideo: "https://www.youtube.com/watch?v=tRFcYAf5puI"
      },
      {
        id: "hw-10",
        titulo: "PC lento sem diagnóstico claro",
        descricao: "Computador está lento mas não há causa aparente",
        causa: "Pode ser hardware subdimensionado, disco cheio, malware ou muitos programas iniciando",
        solucao: "Faça diagnóstico completo de hardware e software",
        passos: [
          "Verifique uso de CPU/RAM/Disco no Gerenciador de Tarefas (Ctrl+Shift+Esc)",
          "Se disco está sempre em 100%, considere trocar por SSD",
          "Se RAM está alta, feche programas ou adicione mais memória",
          "Verifique temperatura com HWMonitor",
          "Execute antivírus completo",
          "Desative programas desnecessários na inicialização",
          "Limpe arquivos temporários com a Limpeza de Disco",
          "Considere reinstalar o sistema se nada resolver"
        ],
        tags: ["lento", "diagnóstico", "performance", "ram", "cpu", "ssd"],
        video: "https://youtu.be/7VGk-HaLAb8?si=llRPSxRksTp3MJrn",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "hw-11",
        titulo: "Como montar um PC do zero",
        descricao: "Aprenda a montar seu próprio computador passo a passo",
        causa: "Falta de conhecimento sobre montagem de hardware",
        solucao: "Siga o guia completo de montagem com vídeo demonstrativo",
        passos: [
          "Prepare a área de trabalho com boa iluminação e espaço",
          "Use pulseira antiestática ou toque em metal aterrado",
          "Instale o processador (CPU) na placa-mãe com cuidado",
          "Encaixe os pentes de memória RAM nos slots",
          "Aplique pasta térmica e instale o cooler do processador",
          "Fixe a placa-mãe no gabinete usando os espaçadores",
          "Instale a fonte de alimentação no gabinete",
          "Conecte o SSD/HD e unidade óptica (se houver)",
          "Instale a placa de vídeo no slot PCI-Express",
          "Conecte todos os cabos de energia e dados",
          "Conecte os cabos do painel frontal (power, reset, leds)",
          "Feche o gabinete e faça o primeiro boot"
        ],
        tags: ["montagem", "pc gamer", "montar", "build", "computador", "hardware", "tutorial"],
        video: "https://youtu.be/O9845EjK7o0?si=M44uJbLWKdagZHEd",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      }
    ]
  },
  {
    id: "software",
    nome: "Software",
    icone: "/src/assets/SOFT-ICON.jpg",
    cor: "#10B981",
    problemas: [
      {
        id: "sw-1",
        titulo: "Computador muito lento",
        descricao: "Sistema demora para abrir programas e responder",
        causa: "Muitos programas na inicialização, disco cheio, malware ou hardware desatualizado",
        solucao: "Otimize a inicialização, limpe arquivos e verifique por malware",
        passos: [
          "Pressione Ctrl+Shift+Esc para abrir o Gerenciador de Tarefas",
          "Vá na aba 'Inicializar' e desative programas desnecessários",
          "Use a Limpeza de Disco (digite na busca do Windows)",
          "Selecione todos os tipos de arquivo e clique em 'Limpar'",
          "Execute o Windows Defender ou seu antivírus",
          "Verifique se há atualizações do Windows pendentes",
          "Considere adicionar mais RAM ou trocar HD por SSD"
        ],
        tags: ["lento", "inicialização", "otimização", "performance", "limpeza"],
        video: "https://youtu.be/HyggA72ZMt0?si=p7cRWMcsa70PNjgn",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      },
      {
        id: "sw-2",
        titulo: "O que é sistema operacional?",
        descricao: "Entenda o que é e para que serve o sistema operacional",
        causa: "Dúvida conceitual comum entre usuários iniciantes",
        solucao: "O sistema operacional é o software principal que gerencia todo o computador",
        passos: [
          "Sistema Operacional (SO) é o programa base do computador",
          "Exemplos: Windows, macOS, Linux, Android, iOS",
          "Ele gerencia hardware (teclado, mouse, tela, memória)",
          "Permite instalar e executar outros programas",
          "Organiza arquivos e pastas no seu computador",
          "Fornece interface gráfica para você interagir",
          "Sem SO, o computador não funcionaria de forma utilizável"
        ],
        tags: ["sistema operacional", "windows", "conceito", "iniciante", "básico"],
        video: "https://youtu.be/yHhedN166ls?si=lWRyd3x0BO0mca4-",
        librasVideo: "https://www.youtube.com/watch?v=Xz8M3oNGBkY"
      },
      {
        id: "sw-3",
        titulo: "Para que serve o antivírus?",
        descricao: "Entenda a importância de ter um antivírus ativo",
        causa: "Proteção contra malware, vírus e ameaças digitais",
        solucao: "Antivírus protege seu computador contra programas maliciosos em tempo real",
        passos: [
          "Antivírus detecta e remove programas maliciosos",
          "Protege contra vírus, trojans, ransomware e spyware",
          "Analisa arquivos baixados antes de você abrir",
          "Verifica sites perigosos enquanto você navega",
          "Windows 10/11 já vem com Windows Defender (gratuito e eficaz)",
          "Mantenha o antivírus sempre atualizado",
          "Faça varreduras completas semanalmente"
        ],
        tags: ["antivírus", "proteção", "vírus", "segurança", "malware"],
        video: "https://youtu.be/gBfMABd1IZY?si=4PGc-dePyPKqy5oA",
        librasVideo: "https://www.youtube.com/watch?v=bnKP7qXaHl4"
      },
      {
        id: "sw-4",
        titulo: "Pendrive desconhecido é seguro?",
        descricao: "Riscos de usar pendrives de origem desconhecida",
        causa: "Pendrives podem conter malware que infecta automaticamente",
        solucao: "Nunca conecte pendrives de origem desconhecida sem precauções",
        passos: [
          "NUNCA conecte pendrive encontrado ou de estranhos",
          "Pendrives podem ter malware que executa automaticamente",
          "Se precisar verificar, use computador isolado (sem rede)",
          "Desative a execução automática no Windows",
          "Sempre escaneie pendrives com antivírus antes de abrir",
          "Prefira compartilhar arquivos por nuvem (Google Drive, OneDrive)",
          "Em ambiente corporativo, siga as políticas de segurança"
        ],
        tags: ["pendrive", "segurança", "malware", "desconhecido", "risco"],
        video: "https://youtu.be/hPupqlLxxO4?si=OuzqAphocK4gRGFSA",
        librasVideo: "https://www.youtube.com/watch?v=tRFcYAf5puI"
      },
      {
        id: "sw-5",
        titulo: "O que é backup?",
        descricao: "Entenda a importância de fazer cópias de segurança",
        causa: "Prevenção contra perda de dados por falhas ou acidentes",
        solucao: "Backup é uma cópia de segurança dos seus arquivos importantes",
        passos: [
          "Backup = cópia de segurança dos seus arquivos",
          "Protege contra: falhas de HD, vírus, roubo, acidentes",
          "Regra 3-2-1: 3 cópias, 2 tipos de mídia, 1 offsite",
          "Opções: HD externo, pendrive, nuvem (Google Drive, OneDrive)",
          "Configure backup automático no Windows ou use ferramentas",
          "Faça backup de: documentos, fotos, vídeos, trabalhos",
          "Teste seus backups periodicamente restaurando arquivos"
        ],
        tags: ["backup", "cópia", "segurança", "nuvem", "hd externo"],
        video: "https://youtu.be/OK2u0WEKJCg?si=ypZHKfAAwEBg--QE",
        librasVideo: "https://www.youtube.com/watch?v=Xz8M3oNGBkY"
      },
      {
        id: "sw-6",
        titulo: "O que é um vírus?",
        descricao: "Entenda o que são vírus de computador e como se proteger",
        causa: "Vírus são programas maliciosos que podem danificar seu sistema",
        solucao: "Mantenha antivírus atualizado e evite comportamentos de risco",
        passos: [
          "Vírus é um programa criado para causar danos",
          "Pode roubar dados, destruir arquivos ou sequestrar PC",
          "Tipos: vírus, worm, trojan, ransomware, spyware",
          "Como pega: downloads suspeitos, e-mails, sites maliciosos",
          "Prevenção: antivírus atualizado + cuidado ao clicar",
          "Não abra anexos de e-mails desconhecidos",
          "Baixe programas apenas de sites oficiais"
        ],
        tags: ["vírus", "malware", "segurança", "proteção", "trojan"],
        video: "https://youtu.be/7IYEyph4uX8?si=exoVVoIi-bv2cQSB",
        librasVideo: "https://www.youtube.com/watch?v=bnKP7qXaHl4"
      },
      {
        id: "sw-7",
        titulo: "Programas piratas são perigosos?",
        descricao: "Riscos de usar software não licenciado",
        causa: "Programas piratas frequentemente contêm malware escondido",
        solucao: "Use software original ou alternativas gratuitas legais",
        passos: [
          "SIM, programas piratas são muito perigosos",
          "Cracks e keygens frequentemente contêm vírus/trojans",
          "Você pode ter dados roubados sem perceber",
          "Ransomware pode criptografar todos seus arquivos",
          "Alternativas gratuitas: LibreOffice, GIMP, VLC, etc.",
          "Muitos programas têm versões gratuitas ou estudante",
          "Além dos riscos, pirataria é crime (Lei 9.609/98)"
        ],
        tags: ["pirataria", "crack", "segurança", "software", "legal"],
        video: "https://youtu.be/yZTGbHqIns0?si=klHFsqFPY4TJEeNf",
        librasVideo: "https://www.youtube.com/watch?v=bnKP7qXaHl4"
      },
      {
        id: "sw-8",
        titulo: "O que é firewall?",
        descricao: "Entenda como o firewall protege seu computador",
        causa: "Proteção contra acessos não autorizados pela rede",
        solucao: "Firewall é uma barreira que controla o tráfego de rede",
        passos: [
          "Firewall = 'parede de fogo' contra invasões",
          "Controla quais programas podem acessar a internet",
          "Bloqueia tentativas de acesso externo não autorizado",
          "Windows já tem firewall integrado e ativo",
          "Verifique: Configurações > Privacidade e Segurança > Firewall",
          "Não desative o firewall sem necessidade",
          "Em redes públicas (cafés, aeroportos) é ainda mais importante"
        ],
        tags: ["firewall", "rede", "segurança", "proteção", "invasão"],
        video: "https://youtu.be/PUf4rVBi1-g?si=-mlFb27KjnBY_dEg",
        librasVideo: "https://www.youtube.com/watch?v=Xz8M3oNGBkY"
      },
      {
        id: "sw-9",
        titulo: "Como saber se o PC está seguro?",
        descricao: "Verificações básicas de segurança do sistema",
        causa: "Muitos usuários não sabem avaliar a segurança do computador",
        solucao: "Faça verificações regulares de segurança e mantenha tudo atualizado",
        passos: [
          "Verifique se o Windows está atualizado",
          "Confirme que o antivírus está ativo e atualizado",
          "Verifique se o firewall está ativado",
          "Execute varredura completa com antivírus",
          "Verifique programas instalados (remova desconhecidos)",
          "Use o Segurança do Windows para ver status geral",
          "Ative autenticação em duas etapas nas suas contas"
        ],
        tags: ["segurança", "verificação", "antivírus", "atualização", "proteção"],
        video: "https://youtu.be/GzQkHqmfy9c?si=ok12BdC8BWTz01VM",
        librasVideo: "https://www.youtube.com/watch?v=bnKP7qXaHl4"
      },
      {
        id: "sw-10",
        titulo: "É necessário atualizar sempre?",
        descricao: "Importância de manter o sistema e programas atualizados",
        causa: "Atualizações corrigem falhas de segurança e melhoram performance",
        solucao: "Sim, mantenha sempre o sistema e programas atualizados",
        passos: [
          "Atualizações corrigem vulnerabilidades de segurança",
          "Hackers exploram falhas em versões antigas",
          "Atualizações também trazem novos recursos",
          "Configure atualizações automáticas no Windows",
          "Reinicie o PC quando solicitado pelas atualizações",
          "Navegadores devem estar sempre na versão mais recente",
          "Aplicativos como Office também precisam de atualizações"
        ],
        tags: ["atualização", "segurança", "windows update", "versão", "patch"],
        video: "https://youtu.be/MwuhPwQb0QU?si=bgBOgqa9b2oy3EaO",
        librasVideo: "https://www.youtube.com/watch?v=Xz8M3oNGBkY"
      },
      {
        id: "sw-11",
        titulo: "Muitos erros no computador",
        descricao: "Sistema apresenta muitos erros e travamentos",
        causa: "Arquivos corrompidos, conflitos de software ou malware",
        solucao: "Execute ferramentas de diagnóstico e reparo do Windows",
        passos: [
          "Execute o Verificador de Arquivos do Sistema (SFC)",
          "Abra Prompt de Comando como administrador",
          "Digite: sfc /scannow e pressione Enter",
          "Aguarde a verificação completar (pode demorar)",
          "Se houver erros, execute também: DISM /Online /Cleanup-Image /RestoreHealth",
          "Reinicie o computador após os comandos",
          "Se persistir, considere restaurar ou reinstalar o Windows"
        ],
        tags: ["erro", "travamento", "sfc", "reparo", "sistema", "corrompido"],
        video: "https://youtu.be/YEw6HbjmWGQ?si=LgiqS-oOGPKW4Pfo",
        librasVideo: "https://www.youtube.com/watch?v=VQ_8HV1GzGc"
      }
    ]
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getProblemById = (categoryId: string, problemId: string): Problem | undefined => {
  const category = getCategoryById(categoryId);
  return category?.problemas.find(p => p.id === problemId);
};

export const searchProblems = (categoryId: string, query: string): Problem[] => {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const lowerQuery = query.toLowerCase();
  return category.problemas.filter(p => 
    p.titulo.toLowerCase().includes(lowerQuery) ||
    p.descricao.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
