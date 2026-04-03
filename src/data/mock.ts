import type {
  Church, Group, TimelinePost, Message, CustomPage,
  CalendarEvent, Banner, LiveStream, BibleBook, Note,
  Donation, FinancialTransaction, FinancialSummary,
  PushNotification, PrayerRequest, DownloadItem, Member,
  DashboardStats, Devotional, CheckIn, Volunteer, VolunteerSchedule,
  Course, CourseLesson, PhotoAlbum, FormSurvey,
} from '../types';

// ---- Church ----
export const mockChurch: Church = {
  id: 'church-1',
  name: 'Igreja Glory',
  denomination: 'Assembleia de Deus',
  address: 'Rua da Paz, 123',
  city: 'São Paulo',
  state: 'SP',
  phone: '(11) 99999-0000',
  email: 'contato@igrejglory.com.br',
  pastorName: 'Pr. Carlos Silva',
  memberCount: 1250,
  createdAt: '2020-01-15',
};

// ---- Dashboard Stats ----
export const mockDashboardStats: DashboardStats = {
  totalMembers: 1250,
  activeGroups: 48,
  upcomingEvents: 12,
  monthlyDonations: 87500,
  prayerRequests: 34,
  newMembers: 18,
  liveViewers: 342,
  pushSent: 156,
};

// ---- Groups ----
export const mockGroups: Group[] = [
  { id: 'g1', name: 'Jovens em Cristo', description: 'Grupo de jovens de 18 a 30 anos', type: 'youth', leaderId: 'u2', leaderName: 'Maria Oliveira', memberCount: 85, churchId: 'church-1', createdAt: '2023-03-10' },
  { id: 'g2', name: 'Louvor & Adoração', description: 'Ministério de louvor e adoração', type: 'worship', leaderId: 'u3', leaderName: 'Pedro Santos', memberCount: 32, churchId: 'church-1', createdAt: '2022-06-15' },
  { id: 'g3', name: 'Células Centro', description: 'Células do bairro Centro', type: 'cell', leaderId: 'u4', leaderName: 'Ana Costa', memberCount: 120, churchId: 'church-1', createdAt: '2021-01-20' },
  { id: 'g4', name: 'Kids Glory', description: 'Ministério infantil', type: 'children', leaderId: 'u5', leaderName: 'Julia Mendes', memberCount: 65, churchId: 'church-1', createdAt: '2022-08-05' },
  { id: 'g5', name: 'Intercessão', description: 'Grupo de intercessores da igreja', type: 'ministry', leaderId: 'u6', leaderName: 'Rosa Lima', memberCount: 28, churchId: 'church-1', createdAt: '2020-11-12' },
  { id: 'g6', name: 'Casais em Aliança', description: 'Ministério de casais', type: 'ministry', leaderId: 'u7', leaderName: 'Roberto & Marta Alves', memberCount: 94, churchId: 'church-1', createdAt: '2021-05-18' },
];

// ---- Timeline ----
export const mockTimelinePosts: TimelinePost[] = [
  { id: 't1', authorId: 'u1', authorName: 'Pr. Carlos Silva', content: '🙏 Culto de oração hoje às 19h30. Venha buscar a presença de Deus conosco!', type: 'announcement', likes: 45, comments: 8, createdAt: '2026-02-20T08:00:00', churchId: 'church-1' },
  { id: 't2', authorId: 'u2', authorName: 'Maria Oliveira', content: '🎉 Retiro da juventude confirmado! 15 a 17 de março. Inscrições abertas no app.', type: 'event', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600', likes: 123, comments: 32, createdAt: '2026-02-19T14:30:00', churchId: 'church-1' },
  { id: 't3', authorId: 'u1', authorName: 'Pr. Carlos Silva', content: '"Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna." - João 3:16\n\nMeditemos neste amor incondicional.', type: 'devotional', likes: 89, comments: 15, createdAt: '2026-02-18T06:00:00', churchId: 'church-1' },
  { id: 't4', authorId: 'u3', authorName: 'Pedro Santos', content: '🎵 Novo louvor disponível! Ouça "Glória ao Rei" em todas as plataformas.', type: 'highlight', likes: 67, comments: 12, createdAt: '2026-02-17T10:00:00', churchId: 'church-1' },
  { id: 't5', authorId: 'u1', authorName: 'Pr. Carlos Silva', content: '📢 Campanha do agasalho: precisamos de doações até 28/02. Tragam roupas em bom estado na secretaria.', type: 'news', likes: 34, comments: 6, createdAt: '2026-02-16T09:00:00', churchId: 'church-1' },
];

// ---- Messages ----
export const mockMessages: Message[] = [
  { id: 'm1', title: 'A Força da Oração', description: 'Mensagem sobre o poder transformador da oração na vida do cristão.', type: 'video', mediaUrl: 'https://youtube.com/watch?v=example1', speaker: 'Pr. Carlos Silva', duration: '45:20', category: 'Culto Dominical', views: 1250, createdAt: '2026-02-16', churchId: 'church-1' },
  { id: 'm2', title: 'Fé que Move Montanhas', description: 'Estudo bíblico sobre a fé e suas manifestações.', type: 'audio', mediaUrl: 'https://soundcloud.com/example', speaker: 'Pr. Carlos Silva', duration: '38:15', category: 'Estudo Bíblico', views: 890, createdAt: '2026-02-12', churchId: 'church-1' },
  { id: 'm3', title: 'O Amor Incondicional', description: 'Reflexão sobre o amor de Deus e como demonstrá-lo ao próximo.', type: 'text', content: 'O amor de Deus é a força mais poderosa do universo...', speaker: 'Pra. Marta Alves', category: 'Devocional', views: 654, createdAt: '2026-02-10', churchId: 'church-1' },
  { id: 'm4', title: 'Vivendo em Comunidade', description: 'A importância da comunhão entre os irmãos.', type: 'video', mediaUrl: 'https://youtube.com/watch?v=example2', speaker: 'Pr. Carlos Silva', duration: '52:00', category: 'Culto Dominical', views: 1100, createdAt: '2026-02-09', churchId: 'church-1' },
];

// ---- Pages ----
export const mockPages: CustomPage[] = [
  { id: 'p1', title: 'Sobre Nós', slug: 'sobre-nos', content: '<h2>Nossa História</h2><p>A Igreja Glory foi fundada em 2020 com a missão de levar a palavra de Deus...</p>', type: 'institutional', published: true, churchId: 'church-1', createdAt: '2023-01-15', updatedAt: '2026-01-10' },
  { id: 'p2', title: 'Equipe Pastoral', slug: 'equipe-pastoral', content: '<h2>Nossos Pastores</h2><p>Conheça a equipe que lidera a Igreja Glory...</p>', type: 'team', published: true, churchId: 'church-1', createdAt: '2023-02-20', updatedAt: '2026-01-15' },
  { id: 'p3', title: 'Ministério de Louvor', slug: 'ministerio-louvor', content: '<h2>Louvor & Adoração</h2><p>Nosso ministério de louvor existe para glorificar a Deus...</p>', type: 'ministry', published: true, churchId: 'church-1', createdAt: '2023-06-10', updatedAt: '2025-12-20' },
];

// ---- Calendar Events ----
export const mockEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Culto Dominical', description: 'Culto de celebração com toda a família', startDate: '2026-02-22', endDate: '2026-02-22', time: '09:00', location: 'Templo Principal', type: 'worship', registrationEnabled: false, registeredCount: 0, churchId: 'church-1' },
  { id: 'e2', title: 'Retiro da Juventude', description: 'Três dias de imersão com Deus', startDate: '2026-03-15', endDate: '2026-03-17', time: '08:00', location: 'Acampamento Serra da Paz', type: 'conference', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600', registrationEnabled: true, registrationLimit: 150, registeredCount: 87, price: 250, churchId: 'church-1', groupId: 'g1' },
  { id: 'e3', title: 'Conferência de Líderes', description: 'Capacitação para líderes de células e ministérios', startDate: '2026-03-08', endDate: '2026-03-08', time: '14:00', location: 'Salão Multiuso', type: 'training', registrationEnabled: true, registrationLimit: 80, registeredCount: 52, churchId: 'church-1' },
  { id: 'e4', title: 'Culto de Oração', description: 'Busquemos juntos a presença de Deus', startDate: '2026-02-20', endDate: '2026-02-20', time: '19:30', location: 'Templo Principal', type: 'worship', registrationEnabled: false, registeredCount: 0, churchId: 'church-1' },
  { id: 'e5', title: 'Encontro de Casais', description: 'Noite especial para casais', startDate: '2026-03-01', endDate: '2026-03-01', time: '19:00', location: 'Salão Multiuso', type: 'social', registrationEnabled: true, registeredCount: 38, price: 80, churchId: 'church-1', groupId: 'g6' },
  { id: 'e6', title: 'EBD - Escola Bíblica', description: 'Estudo dominical para todas as idades', startDate: '2026-02-22', endDate: '2026-02-22', time: '08:00', location: 'Salas de Aula', type: 'training', registrationEnabled: false, registeredCount: 0, churchId: 'church-1' },
];

// ---- Banners ----
export const mockBanners: Banner[] = [
  { id: 'b1', title: 'Retiro da Juventude 2026', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200', linkUrl: '/events/e2', active: true, order: 1, startDate: '2026-02-01', endDate: '2026-03-15', churchId: 'church-1' },
  { id: 'b2', title: 'Cultos Ao Vivo', imageUrl: 'https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=1200', linkUrl: '/live', videoUrl: 'https://youtube.com/live/example', active: true, order: 2, startDate: '2026-01-01', endDate: '2026-12-31', churchId: 'church-1' },
  { id: 'b3', title: 'Campanha do Agasalho', imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200', active: true, order: 3, startDate: '2026-02-01', endDate: '2026-02-28', churchId: 'church-1' },
];

// ---- Live Stream ----
export const mockLiveStreams: LiveStream[] = [
  { id: 'ls1', title: 'Culto Dominical - Ao Vivo', description: 'Acompanhe o culto dominical ao vivo', streamUrl: 'https://youtube.com/live/example', isLive: false, viewerCount: 0, churchId: 'church-1' },
];

// ---- Bible Books ----
export const mockBibleBooks: BibleBook[] = [
  { id: 1, name: 'Gênesis', abbrev: 'Gn', chapters: 50, testament: 'old' },
  { id: 2, name: 'Êxodo', abbrev: 'Êx', chapters: 40, testament: 'old' },
  { id: 3, name: 'Levítico', abbrev: 'Lv', chapters: 27, testament: 'old' },
  { id: 4, name: 'Números', abbrev: 'Nm', chapters: 36, testament: 'old' },
  { id: 5, name: 'Deuteronômio', abbrev: 'Dt', chapters: 34, testament: 'old' },
  { id: 6, name: 'Josué', abbrev: 'Js', chapters: 24, testament: 'old' },
  { id: 7, name: 'Juízes', abbrev: 'Jz', chapters: 21, testament: 'old' },
  { id: 8, name: 'Rute', abbrev: 'Rt', chapters: 4, testament: 'old' },
  { id: 9, name: '1 Samuel', abbrev: '1Sm', chapters: 31, testament: 'old' },
  { id: 10, name: '2 Samuel', abbrev: '2Sm', chapters: 24, testament: 'old' },
  { id: 11, name: '1 Reis', abbrev: '1Rs', chapters: 22, testament: 'old' },
  { id: 12, name: '2 Reis', abbrev: '2Rs', chapters: 25, testament: 'old' },
  { id: 13, name: '1 Crônicas', abbrev: '1Cr', chapters: 29, testament: 'old' },
  { id: 14, name: '2 Crônicas', abbrev: '2Cr', chapters: 36, testament: 'old' },
  { id: 15, name: 'Esdras', abbrev: 'Ed', chapters: 10, testament: 'old' },
  { id: 16, name: 'Neemias', abbrev: 'Ne', chapters: 13, testament: 'old' },
  { id: 17, name: 'Ester', abbrev: 'Et', chapters: 10, testament: 'old' },
  { id: 18, name: 'Jó', abbrev: 'Jó', chapters: 42, testament: 'old' },
  { id: 19, name: 'Salmos', abbrev: 'Sl', chapters: 150, testament: 'old' },
  { id: 20, name: 'Provérbios', abbrev: 'Pv', chapters: 31, testament: 'old' },
  { id: 21, name: 'Eclesiastes', abbrev: 'Ec', chapters: 12, testament: 'old' },
  { id: 22, name: 'Cantares', abbrev: 'Ct', chapters: 8, testament: 'old' },
  { id: 23, name: 'Isaías', abbrev: 'Is', chapters: 66, testament: 'old' },
  { id: 24, name: 'Jeremias', abbrev: 'Jr', chapters: 52, testament: 'old' },
  { id: 25, name: 'Lamentações', abbrev: 'Lm', chapters: 5, testament: 'old' },
  { id: 26, name: 'Ezequiel', abbrev: 'Ez', chapters: 48, testament: 'old' },
  { id: 27, name: 'Daniel', abbrev: 'Dn', chapters: 12, testament: 'old' },
  { id: 28, name: 'Oséias', abbrev: 'Os', chapters: 14, testament: 'old' },
  { id: 29, name: 'Joel', abbrev: 'Jl', chapters: 3, testament: 'old' },
  { id: 30, name: 'Amós', abbrev: 'Am', chapters: 9, testament: 'old' },
  { id: 31, name: 'Obadias', abbrev: 'Ob', chapters: 1, testament: 'old' },
  { id: 32, name: 'Jonas', abbrev: 'Jn', chapters: 4, testament: 'old' },
  { id: 33, name: 'Miquéias', abbrev: 'Mq', chapters: 7, testament: 'old' },
  { id: 34, name: 'Naum', abbrev: 'Na', chapters: 3, testament: 'old' },
  { id: 35, name: 'Habacuque', abbrev: 'Hc', chapters: 3, testament: 'old' },
  { id: 36, name: 'Sofonias', abbrev: 'Sf', chapters: 3, testament: 'old' },
  { id: 37, name: 'Ageu', abbrev: 'Ag', chapters: 2, testament: 'old' },
  { id: 38, name: 'Zacarias', abbrev: 'Zc', chapters: 14, testament: 'old' },
  { id: 39, name: 'Malaquias', abbrev: 'Ml', chapters: 4, testament: 'old' },
  { id: 40, name: 'Mateus', abbrev: 'Mt', chapters: 28, testament: 'new' },
  { id: 41, name: 'Marcos', abbrev: 'Mc', chapters: 16, testament: 'new' },
  { id: 42, name: 'Lucas', abbrev: 'Lc', chapters: 24, testament: 'new' },
  { id: 43, name: 'João', abbrev: 'Jo', chapters: 21, testament: 'new' },
  { id: 44, name: 'Atos', abbrev: 'At', chapters: 28, testament: 'new' },
  { id: 45, name: 'Romanos', abbrev: 'Rm', chapters: 16, testament: 'new' },
  { id: 46, name: '1 Coríntios', abbrev: '1Co', chapters: 16, testament: 'new' },
  { id: 47, name: '2 Coríntios', abbrev: '2Co', chapters: 13, testament: 'new' },
  { id: 48, name: 'Gálatas', abbrev: 'Gl', chapters: 6, testament: 'new' },
  { id: 49, name: 'Efésios', abbrev: 'Ef', chapters: 6, testament: 'new' },
  { id: 50, name: 'Filipenses', abbrev: 'Fp', chapters: 4, testament: 'new' },
  { id: 51, name: 'Colossenses', abbrev: 'Cl', chapters: 4, testament: 'new' },
  { id: 52, name: '1 Tessalonicenses', abbrev: '1Ts', chapters: 5, testament: 'new' },
  { id: 53, name: '2 Tessalonicenses', abbrev: '2Ts', chapters: 3, testament: 'new' },
  { id: 54, name: '1 Timóteo', abbrev: '1Tm', chapters: 6, testament: 'new' },
  { id: 55, name: '2 Timóteo', abbrev: '2Tm', chapters: 4, testament: 'new' },
  { id: 56, name: 'Tito', abbrev: 'Tt', chapters: 3, testament: 'new' },
  { id: 57, name: 'Filemom', abbrev: 'Fm', chapters: 1, testament: 'new' },
  { id: 58, name: 'Hebreus', abbrev: 'Hb', chapters: 13, testament: 'new' },
  { id: 59, name: 'Tiago', abbrev: 'Tg', chapters: 5, testament: 'new' },
  { id: 60, name: '1 Pedro', abbrev: '1Pe', chapters: 5, testament: 'new' },
  { id: 61, name: '2 Pedro', abbrev: '2Pe', chapters: 3, testament: 'new' },
  { id: 62, name: '1 João', abbrev: '1Jo', chapters: 5, testament: 'new' },
  { id: 63, name: '2 João', abbrev: '2Jo', chapters: 1, testament: 'new' },
  { id: 64, name: '3 João', abbrev: '3Jo', chapters: 1, testament: 'new' },
  { id: 65, name: 'Judas', abbrev: 'Jd', chapters: 1, testament: 'new' },
  { id: 66, name: 'Apocalipse', abbrev: 'Ap', chapters: 22, testament: 'new' },
];

// ---- Notes ----
export const mockNotes: Note[] = [
  { id: 'n1', title: 'Culto 16/02 - A Força da Oração', content: 'Pontos principais:\n- A oração é a chave para a vitória\n- Devemos orar sem cessar\n- A oração do justo muito pode em seus efeitos', category: 'worship', userId: 'u1', createdAt: '2026-02-16T10:00:00', updatedAt: '2026-02-16T11:30:00', synced: true },
  { id: 'n2', title: 'Estudo Bíblico - Romanos 8', content: 'Estudo sobre a vida no Espírito:\n- Não há condenação para os que estão em Cristo\n- O Espírito vivifica\n- Somos mais que vencedores', category: 'training', userId: 'u1', createdAt: '2026-02-12T20:00:00', updatedAt: '2026-02-12T21:30:00', synced: true },
];

// ---- Donations ----
export const mockDonations: Donation[] = [
  { id: 'd1', userId: 'u1', userName: 'João Ferreira', type: 'tithe', amount: 1500, method: 'pix', status: 'completed', createdAt: '2026-02-18', churchId: 'church-1' },
  { id: 'd2', userId: 'u2', userName: 'Maria Oliveira', type: 'offering', amount: 200, method: 'credit_card', status: 'completed', createdAt: '2026-02-17', churchId: 'church-1' },
  { id: 'd3', userId: 'u3', userName: 'Pedro Santos', type: 'campaign', amount: 500, method: 'pix', status: 'completed', reference: 'Campanha Missionária', createdAt: '2026-02-16', churchId: 'church-1' },
  { id: 'd4', userId: 'u4', userName: 'Ana Costa', type: 'tithe', amount: 800, method: 'bank_transfer', status: 'completed', createdAt: '2026-02-15', churchId: 'church-1' },
  { id: 'd5', userId: 'u5', userName: 'Julia Mendes', type: 'event', amount: 250, method: 'credit_card', status: 'pending', reference: 'Retiro Juventude', createdAt: '2026-02-14', churchId: 'church-1' },
];

// ---- Financial Transactions ----
export const mockFinancialSummary: FinancialSummary = {
  totalIncome: 87500,
  totalExpenses: 42300,
  balance: 45200,
  tithes: 52000,
  offerings: 18500,
  eventRegistrations: 12000,
  campaigns: 5000,
  period: 'Fevereiro 2026',
};

export const mockFinancialTransactions: FinancialTransaction[] = [
  { id: 'ft1', type: 'income', category: 'Dízimos', description: 'Dízimos - Semana 3', amount: 15200, date: '2026-02-16', status: 'completed', churchId: 'church-1' },
  { id: 'ft2', type: 'income', category: 'Ofertas', description: 'Ofertas - Culto Dominical', amount: 4800, date: '2026-02-16', status: 'completed', churchId: 'church-1' },
  { id: 'ft3', type: 'expense', category: 'Aluguel', description: 'Aluguel do Templo', amount: 8500, date: '2026-02-10', status: 'completed', churchId: 'church-1' },
  { id: 'ft4', type: 'expense', category: 'Utilidades', description: 'Conta de Energia', amount: 1200, date: '2026-02-08', status: 'completed', churchId: 'church-1' },
  { id: 'ft5', type: 'income', category: 'Inscrições', description: 'Inscrições Retiro Juventude', amount: 12000, date: '2026-02-15', status: 'completed', churchId: 'church-1' },
  { id: 'ft6', type: 'expense', category: 'Missões', description: 'Apoio Missionário', amount: 5000, date: '2026-02-12', status: 'completed', churchId: 'church-1' },
];

// ---- Notifications ----
export const mockNotifications: PushNotification[] = [
  { id: 'pn1', title: 'Culto de Oração Hoje!', body: 'Não perca o culto de oração hoje às 19h30. Venha buscar a presença de Deus!', type: 'event', sentAt: '2026-02-20T14:00:00', readCount: 892, totalSent: 1250, churchId: 'church-1' },
  { id: 'pn2', title: 'Novo Devocional Disponível', body: 'Leia o devocional de hoje: "O Amor Incondicional"', type: 'general', sentAt: '2026-02-19T06:00:00', readCount: 654, totalSent: 1250, churchId: 'church-1' },
  { id: 'pn3', title: 'Inscrições Retiro Juventude', body: 'Últimas vagas! Inscreva-se agora para o Retiro da Juventude 2026.', type: 'event', sentAt: '2026-02-18T10:00:00', readCount: 423, totalSent: 850, churchId: 'church-1', groupId: 'g1' },
];

// ---- Prayer Requests ----
export const mockPrayerRequests: PrayerRequest[] = [
  { id: 'pr1', userId: 'u8', userName: 'Fernanda Lima', request: 'Peço oração pela saúde da minha mãe que está internada.', isAnonymous: false, status: 'praying', prayerCount: 23, intercessors: ['Rosa Lima', 'Ana Costa'], createdAt: '2026-02-20T07:00:00', churchId: 'church-1' },
  { id: 'pr2', userId: 'u9', userName: 'Anônimo', request: 'Preciso de oração pelo meu casamento que está passando por dificuldades.', isAnonymous: true, status: 'praying', prayerCount: 45, intercessors: ['Rosa Lima', 'Marta Alves', 'Julia Mendes'], createdAt: '2026-02-19T15:00:00', churchId: 'church-1' },
  { id: 'pr3', userId: 'u10', userName: 'Lucas Ribeiro', request: 'Oração por uma oportunidade de emprego. Estou desempregado há 3 meses.', isAnonymous: false, status: 'pending', prayerCount: 12, intercessors: [], createdAt: '2026-02-19T09:00:00', churchId: 'church-1' },
  { id: 'pr4', userId: 'u11', userName: 'Carla Souza', request: 'Agradeço a Deus! Minha filha foi aprovada no vestibular! Oração respondida!', isAnonymous: false, status: 'answered', prayerCount: 67, intercessors: ['Rosa Lima'], createdAt: '2026-02-15T12:00:00', churchId: 'church-1' },
];

// ---- Downloads ----
export const mockDownloads: DownloadItem[] = [
  { id: 'dl1', title: 'Devocional 40 Dias de Oração', description: 'E-book com 40 devocionais para fortalecer sua vida de oração.', type: 'ebook', fileUrl: '/files/devocional-40-dias.pdf', fileSize: '2.4 MB', format: 'pdf', downloadCount: 342, churchId: 'church-1', createdAt: '2026-01-15' },
  { id: 'dl2', title: 'Manual do Líder de Célula', description: 'Guia completo para líderes de células e pequenos grupos.', type: 'manual', fileUrl: '/files/manual-lider.pdf', fileSize: '5.1 MB', format: 'pdf', downloadCount: 128, churchId: 'church-1', createdAt: '2025-11-20' },
  { id: 'dl3', title: 'Estudo: Carta aos Romanos', description: 'Material de estudo aprofundado sobre a carta de Paulo aos Romanos.', type: 'study', fileUrl: '/files/estudo-romanos.pdf', fileSize: '3.8 MB', format: 'pdf', downloadCount: 215, groupId: 'g3', churchId: 'church-1', createdAt: '2026-02-01' },
  { id: 'dl4', title: 'Hinário Digital', description: 'Coletânea de hinos e cânticos da igreja.', type: 'ebook', fileUrl: '/files/hinario.epub', fileSize: '1.2 MB', format: 'epub', downloadCount: 456, churchId: 'church-1', createdAt: '2025-06-10' },
];

// ---- Members ----
export const mockMembers: Member[] = [
  { id: 'u1', name: 'Pr. Carlos Silva', email: 'carlos@glory.com', phone: '(11) 99999-0001', role: 'pastor', status: 'active', birthDate: '1975-03-15', address: 'Rua da Paz, 100', city: 'São Paulo', state: 'SP', baptismDate: '1993-12-10', memberSince: '2020-01-15', groups: ['g5'], churchId: 'church-1' },
  { id: 'u2', name: 'Maria Oliveira', email: 'maria@glory.com', phone: '(11) 99999-0002', role: 'leader', status: 'active', birthDate: '1995-07-22', address: 'Av. Brasil, 500', city: 'São Paulo', state: 'SP', baptismDate: '2015-06-20', memberSince: '2021-03-10', groups: ['g1'], churchId: 'church-1' },
  { id: 'u3', name: 'Pedro Santos', email: 'pedro@glory.com', phone: '(11) 99999-0003', role: 'leader', status: 'active', birthDate: '1990-11-08', address: 'Rua das Flores, 200', city: 'São Paulo', state: 'SP', baptismDate: '2010-01-15', memberSince: '2020-06-15', groups: ['g2'], churchId: 'church-1' },
  { id: 'u4', name: 'Ana Costa', email: 'ana@glory.com', phone: '(11) 99999-0004', role: 'leader', status: 'active', birthDate: '1988-04-30', address: 'Rua Central, 50', city: 'São Paulo', state: 'SP', baptismDate: '2008-08-25', memberSince: '2021-01-20', groups: ['g3'], churchId: 'church-1' },
  { id: 'u5', name: 'Julia Mendes', email: 'julia@glory.com', phone: '(11) 99999-0005', role: 'leader', status: 'active', birthDate: '1992-09-12', address: 'Av. Paulista, 800', city: 'São Paulo', state: 'SP', baptismDate: '2012-03-18', memberSince: '2022-08-05', groups: ['g4'], churchId: 'church-1' },
  { id: 'u6', name: 'Rosa Lima', email: 'rosa@glory.com', phone: '(11) 99999-0006', role: 'member', status: 'active', birthDate: '1968-12-05', address: 'Rua Esperança, 300', city: 'São Paulo', state: 'SP', baptismDate: '1990-07-10', memberSince: '2020-11-12', groups: ['g5'], churchId: 'church-1' },
  { id: 'u7', name: 'Roberto Alves', email: 'roberto@glory.com', phone: '(11) 99999-0007', role: 'leader', status: 'active', birthDate: '1982-06-18', address: 'Rua dos Lírios, 150', city: 'São Paulo', state: 'SP', baptismDate: '2002-11-30', memberSince: '2021-05-18', groups: ['g6'], churchId: 'church-1' },
  { id: 'u8', name: 'Fernanda Lima', email: 'fernanda@glory.com', phone: '(11) 99999-0008', role: 'member', status: 'active', birthDate: '1998-02-14', address: 'Av. Santos, 400', city: 'São Paulo', state: 'SP', memberSince: '2023-01-10', groups: ['g1', 'g2'], churchId: 'church-1' },
  { id: 'u9', name: 'Lucas Ribeiro', email: 'lucas@glory.com', phone: '(11) 99999-0009', role: 'member', status: 'active', birthDate: '2000-08-25', address: 'Rua Alegria, 75', city: 'São Paulo', state: 'SP', memberSince: '2024-06-15', groups: ['g1'], churchId: 'church-1' },
  { id: 'u10', name: 'Carla Souza', email: 'carla@glory.com', phone: '(11) 99999-0010', role: 'visitor', status: 'active', birthDate: '1996-10-20', address: 'Rua Nova, 25', city: 'São Paulo', state: 'SP', memberSince: '2026-01-05', groups: [], churchId: 'church-1' },
];

// ---- Devotionals ----
export const mockDevotionals: Devotional[] = [
  { id: 'dev1', title: 'A Paz que Excede o Entendimento', verse: 'E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus.', verseReference: 'Filipenses 4:7', content: 'Em meio às tempestades da vida, Deus nos oferece uma paz sobrenatural. Não é a ausência de problemas, mas a presença constante do Senhor que nos sustenta. Hoje, entregue suas ansiedades a Ele e permita que essa paz inunde todo o seu ser. A paz de Deus não depende das circunstâncias, ela transcende nossa compreensão humana e age como uma guardiã do nosso coração.', author: 'Pr. Carlos Silva', date: '2026-03-31', imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600', likes: 89, churchId: 'church-1' },
  { id: 'dev2', title: 'Renovando as Forças', verse: 'Mas os que esperam no Senhor renovarão as suas forças, subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.', verseReference: 'Isaías 40:31', content: 'Esperar no Senhor não é passividade — é um ato de fé ativa. Quando confiamos no tempo de Deus, nossas forças são renovadas de maneira sobrenatural. Assim como a águia que enfrenta a tempestade e usa os ventos contrários para voar mais alto, nós também podemos transformar nossas adversidades em plataformas de crescimento espiritual.', author: 'Pra. Marta Alves', date: '2026-03-30', imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600', likes: 124, churchId: 'church-1' },
  { id: 'dev3', title: 'O Bom Pastor', verse: 'O Senhor é o meu pastor; nada me faltará.', verseReference: 'Salmos 23:1', content: 'Quando reconhecemos o Senhor como nosso pastor, assumimos a posição de ovelhas que confiam plenamente em quem as guia. Ele conhece nossas necessidades antes mesmo de as expressarmos. Descanse nessa certeza: sob os cuidados do Bom Pastor, absolutamente nada nos faltará.', author: 'Pr. Carlos Silva', date: '2026-03-29', likes: 156, churchId: 'church-1' },
  { id: 'dev4', title: 'Fé em Ação', verse: 'Assim também a fé, se não tiver obras, é morta em si mesma.', verseReference: 'Tiago 2:17', content: 'A verdadeira fé se manifesta em atitudes concretas. Não basta apenas crer — é preciso agir conforme aquilo que cremos. Hoje, reflita: como a sua fé tem se traduzido em ações práticas de amor, generosidade e serviço ao próximo? A fé genuína transforma não apenas quem crê, mas também o ambiente ao redor.', author: 'Pr. Carlos Silva', date: '2026-03-28', imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600', likes: 98, churchId: 'church-1' },
  { id: 'dev5', title: 'Gratidão em Todas as Coisas', verse: 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.', verseReference: '1 Tessalonicenses 5:18', content: 'A gratidão é uma escolha diária que transforma nossa perspectiva. Mesmo diante das dificuldades, podemos encontrar motivos para agradecer. Quando cultivamos um coração grato, abrimos espaço para que Deus opere de maneiras extraordinárias em nossa vida.', author: 'Pra. Marta Alves', date: '2026-03-27', likes: 143, churchId: 'church-1' },
];

// ---- Check-in / Attendance ----
export const mockCheckIns: CheckIn[] = [
  { id: 'ck1', eventId: 'e1', eventTitle: 'Culto Dominical', date: '2026-03-22', totalAttendees: 487, members: [
    { userId: 'u1', userName: 'Pr. Carlos Silva', checkedAt: '2026-03-22T08:45:00' },
    { userId: 'u2', userName: 'Maria Oliveira', checkedAt: '2026-03-22T08:52:00' },
    { userId: 'u3', userName: 'Pedro Santos', checkedAt: '2026-03-22T08:30:00' },
    { userId: 'u6', userName: 'Rosa Lima', checkedAt: '2026-03-22T08:55:00' },
  ], churchId: 'church-1' },
  { id: 'ck2', eventId: 'e4', eventTitle: 'Culto de Oração', date: '2026-03-19', totalAttendees: 215, members: [
    { userId: 'u1', userName: 'Pr. Carlos Silva', checkedAt: '2026-03-19T19:20:00' },
    { userId: 'u6', userName: 'Rosa Lima', checkedAt: '2026-03-19T19:15:00' },
  ], churchId: 'church-1' },
  { id: 'ck3', eventId: 'e1', eventTitle: 'Culto Dominical', date: '2026-03-15', totalAttendees: 523, members: [
    { userId: 'u1', userName: 'Pr. Carlos Silva', checkedAt: '2026-03-15T08:40:00' },
    { userId: 'u2', userName: 'Maria Oliveira', checkedAt: '2026-03-15T08:50:00' },
    { userId: 'u3', userName: 'Pedro Santos', checkedAt: '2026-03-15T08:35:00' },
    { userId: 'u5', userName: 'Julia Mendes', checkedAt: '2026-03-15T08:48:00' },
    { userId: 'u7', userName: 'Roberto Alves', checkedAt: '2026-03-15T08:55:00' },
  ], churchId: 'church-1' },
  { id: 'ck4', eventId: 'e6', eventTitle: 'EBD - Escola Bíblica', date: '2026-03-15', totalAttendees: 189, members: [], churchId: 'church-1' },
];

// ---- Volunteers ----
export const mockVolunteers: Volunteer[] = [
  { id: 'v1', userId: 'u3', userName: 'Pedro Santos', ministry: 'Louvor', role: 'Líder de Louvor', availability: ['sunday_morning', 'sunday_evening', 'wednesday'], skills: ['Violão', 'Teclado', 'Voz'], active: true, startDate: '2020-06-15', churchId: 'church-1' },
  { id: 'v2', userId: 'u2', userName: 'Maria Oliveira', ministry: 'Jovens', role: 'Líder de Jovens', availability: ['sunday_morning', 'saturday'], skills: ['Comunicação', 'Organização', 'Ensino'], active: true, startDate: '2021-03-10', churchId: 'church-1' },
  { id: 'v3', userId: 'u8', userName: 'Fernanda Lima', ministry: 'Louvor', role: 'Backing Vocal', availability: ['sunday_morning', 'flexible'], skills: ['Voz', 'Dança'], active: true, startDate: '2023-06-01', churchId: 'church-1' },
  { id: 'v4', userId: 'u7', userName: 'Roberto Alves', ministry: 'Diaconia', role: 'Diácono', availability: ['sunday_morning', 'sunday_evening', 'wednesday', 'saturday'], skills: ['Recepção', 'Organização', 'Logística'], active: true, startDate: '2021-05-18', churchId: 'church-1' },
  { id: 'v5', userId: 'u5', userName: 'Julia Mendes', ministry: 'Infantil', role: 'Professora Kids', availability: ['sunday_morning'], skills: ['Ensino Infantil', 'Criatividade', 'Música'], active: true, startDate: '2022-08-05', churchId: 'church-1' },
  { id: 'v6', userId: 'u9', userName: 'Lucas Ribeiro', ministry: 'Mídia', role: 'Operador de Mídia', availability: ['sunday_morning', 'sunday_evening'], skills: ['Projeção', 'Transmissão', 'Edição'], active: true, startDate: '2024-08-01', churchId: 'church-1' },
  { id: 'v7', userId: 'u4', userName: 'Ana Costa', ministry: 'Intercessão', role: 'Intercessora', availability: ['sunday_morning', 'wednesday', 'flexible'], skills: ['Oração', 'Aconselhamento'], active: true, startDate: '2021-01-20', churchId: 'church-1' },
];

export const mockVolunteerSchedules: VolunteerSchedule[] = [
  { id: 'vs1', eventTitle: 'Culto Dominical - 30/03', date: '2026-03-30', slots: [
    { role: 'Louvor', volunteerId: 'v1', volunteerName: 'Pedro Santos', confirmed: true },
    { role: 'Backing Vocal', volunteerId: 'v3', volunteerName: 'Fernanda Lima', confirmed: true },
    { role: 'Mídia', volunteerId: 'v6', volunteerName: 'Lucas Ribeiro', confirmed: false },
    { role: 'Diaconia', volunteerId: 'v4', volunteerName: 'Roberto Alves', confirmed: true },
    { role: 'Kids', volunteerId: 'v5', volunteerName: 'Julia Mendes', confirmed: true },
  ], churchId: 'church-1' },
  { id: 'vs2', eventTitle: 'Culto de Oração - 02/04', date: '2026-04-02', slots: [
    { role: 'Intercessão', volunteerId: 'v7', volunteerName: 'Ana Costa', confirmed: true },
    { role: 'Louvor', volunteerId: 'v1', volunteerName: 'Pedro Santos', confirmed: false },
    { role: 'Mídia', volunteerId: 'v6', volunteerName: 'Lucas Ribeiro', confirmed: true },
  ], churchId: 'church-1' },
];

// ---- Courses ----
export const mockCourses: Course[] = [
  { id: 'c1', title: 'Fundamentos da Fé', description: 'Curso básico para novos convertidos sobre os pilares da fé cristã.', instructor: 'Pr. Carlos Silva', category: 'discipleship', totalLessons: 12, enrolledCount: 86, duration: '6 semanas', level: 'beginner', published: true, churchId: 'church-1', createdAt: '2025-09-01', thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400' },
  { id: 'c2', title: 'Liderança Cristã', description: 'Formação de líderes com princípios bíblicos para servir na igreja.', instructor: 'Pra. Marta Alves', category: 'leadership', totalLessons: 8, enrolledCount: 42, duration: '4 semanas', level: 'intermediate', published: true, churchId: 'church-1', createdAt: '2025-11-15', thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400' },
  { id: 'c3', title: 'Panorama do Antigo Testamento', description: 'Estudo panorâmico de todos os livros do Antigo Testamento.', instructor: 'Pr. Carlos Silva', category: 'biblical', totalLessons: 20, enrolledCount: 134, duration: '10 semanas', level: 'intermediate', published: true, churchId: 'church-1', createdAt: '2026-01-10', thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { id: 'c4', title: 'Casamento e Família', description: 'Orientações bíblicas para fortalecer sua família.', instructor: 'Roberto & Marta Alves', category: 'family', totalLessons: 6, enrolledCount: 58, duration: '3 semanas', level: 'beginner', published: true, churchId: 'church-1', createdAt: '2026-02-01', thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400' },
  { id: 'c5', title: 'Teologia Básica', description: 'Introdução aos conceitos fundamentais da teologia cristã.', instructor: 'Pr. Carlos Silva', category: 'theology', totalLessons: 15, enrolledCount: 67, duration: '8 semanas', level: 'advanced', published: true, churchId: 'church-1', createdAt: '2026-02-15' },
];

export const mockCourseLessons: CourseLesson[] = [
  { id: 'cl1', courseId: 'c1', title: 'O que é a Fé?', description: 'Entendendo a fé cristã e seu fundamento.', type: 'video', mediaUrl: 'https://youtube.com/watch?v=example', duration: '25:00', order: 1, completed: true },
  { id: 'cl2', courseId: 'c1', title: 'A Bíblia: Palavra de Deus', description: 'Por que a Bíblia é a autoridade máxima.', type: 'video', duration: '30:00', order: 2, completed: true },
  { id: 'cl3', courseId: 'c1', title: 'Oração: Comunicação com Deus', description: 'Aprendendo a orar com eficácia.', type: 'text', order: 3, completed: false },
  { id: 'cl4', courseId: 'c1', title: 'Batismo e Ceia', description: 'Os sacramentos da igreja cristã.', type: 'video', duration: '35:00', order: 4 },
];

// ---- Photo Gallery ----
export const mockPhotoAlbums: PhotoAlbum[] = [
  { id: 'pa1', title: 'Culto de Adoração - Março 2026', description: 'Momentos especiais do culto dominical', coverUrl: 'https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=600', photoCount: 24, date: '2026-03-22', churchId: 'church-1' },
  { id: 'pa2', title: 'Retiro da Juventude 2026', description: 'Três dias inesquecíveis no acampamento', coverUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600', photoCount: 87, eventId: 'e2', date: '2026-03-17', churchId: 'church-1' },
  { id: 'pa3', title: 'Encontro de Casais', description: 'Noite especial para casais da igreja', coverUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600', photoCount: 35, eventId: 'e5', date: '2026-03-01', churchId: 'church-1' },
  { id: 'pa4', title: 'Conferência de Líderes', description: 'Capacitação e renovação de visão', coverUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600', photoCount: 42, eventId: 'e3', date: '2026-03-08', churchId: 'church-1' },
  { id: 'pa5', title: 'Ação Social - Campanha do Agasalho', description: 'Distribuição de roupas na comunidade', coverUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600', photoCount: 18, date: '2026-02-28', churchId: 'church-1' },
];

// ---- Forms / Surveys ----
export const mockForms: FormSurvey[] = [
  { id: 'f1', title: 'Pesquisa de Satisfação - Cultos', description: 'Ajude-nos a melhorar nossos cultos respondendo esta pesquisa.', type: 'survey', status: 'active', responseCount: 187, fields: [
    { id: 'f1f1', label: 'Como você avalia os cultos dominicais?', type: 'rating', required: true },
    { id: 'f1f2', label: 'O que podemos melhorar?', type: 'textarea', required: false },
    { id: 'f1f3', label: 'Qual horário prefere para o culto?', type: 'radio', required: true, options: ['08:00', '09:00', '10:00', '18:00', '19:00'] },
  ], createdAt: '2026-03-01', closesAt: '2026-04-01', churchId: 'church-1' },
  { id: 'f2', title: 'Ficha de Visitante', description: 'Seja bem-vindo! Preencha seus dados para nos conhecermos melhor.', type: 'registration', status: 'active', responseCount: 43, fields: [
    { id: 'f2f1', label: 'Nome completo', type: 'text', required: true },
    { id: 'f2f2', label: 'Telefone/WhatsApp', type: 'text', required: true },
    { id: 'f2f3', label: 'Como conheceu a igreja?', type: 'select', required: true, options: ['Amigo/Familiar', 'Redes Sociais', 'Passou na frente', 'Evento', 'Outro'] },
    { id: 'f2f4', label: 'Gostaria de receber uma visita pastoral?', type: 'radio', required: false, options: ['Sim', 'Não', 'Talvez'] },
  ], createdAt: '2025-06-01', churchId: 'church-1' },
  { id: 'f3', title: 'Testemunhos', description: 'Compartilhe o que Deus tem feito em sua vida!', type: 'testimony', status: 'active', responseCount: 28, fields: [
    { id: 'f3f1', label: 'Seu nome', type: 'text', required: false },
    { id: 'f3f2', label: 'Seu testemunho', type: 'textarea', required: true },
    { id: 'f3f3', label: 'Pode ser compartilhado publicamente?', type: 'radio', required: true, options: ['Sim', 'Não'] },
  ], createdAt: '2026-01-15', churchId: 'church-1' },
  { id: 'f4', title: 'Avaliação do Retiro 2026', description: 'Conte como foi sua experiência no retiro da juventude.', type: 'feedback', status: 'closed', responseCount: 72, fields: [
    { id: 'f4f1', label: 'Nota geral do retiro', type: 'rating', required: true },
    { id: 'f4f2', label: 'O que mais gostou?', type: 'textarea', required: false },
    { id: 'f4f3', label: 'Participaria novamente?', type: 'radio', required: true, options: ['Com certeza!', 'Provavelmente', 'Não tenho certeza'] },
  ], createdAt: '2026-03-18', closesAt: '2026-03-25', churchId: 'church-1' },
];
