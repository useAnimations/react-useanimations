import type { Messages } from '../en';

export const licence: Messages['licence'] = {
  title: 'Lisans ve koşullar — useAnimations',
  description:
    'useAnimations ikonları ve react-useanimations paketi MIT lisanslıdır: kişisel ve ticari kullanım ile yeniden dağıtım ücretsizdir, atıf gerekmez.',
  name: 'Lisans ve koşullar',
  heading: 'Kullanımı ücretsiz. MIT lisanslı.',
  introHtml: (mitHref: string) =>
    `useAnimations ikonları ve <code>react-useanimations</code> paketi <a href="${mitHref}">MIT lisansı</a> ile yayımlanır.`,
  canDo: 'Neler yapabilirsiniz',
  canDoItemsHtml: [
    'İkonları kişisel ve ticari web sitelerinde, uygulamalarda ve ürünlerde <strong>kullanabilirsiniz</strong>.',
    'İkonları <strong>değiştirebilirsiniz</strong>: renkleri, boyutları, zamanlamayı ya da hareketin kendisini.',
    'İkonları ikon paketleri, şablonlar, temalar, UI kitleri ve bileşen registry’leri içinde de olmak üzere <strong>yeniden dağıtabilirsiniz</strong>.',
  ],
  attribution: 'Atıf',
  attributionText:
    'Zorunlu değil ama memnun oluruz. Dosyaların kendisini yeniden dağıtırken lisans bildirimini koruyun; bize atıf yapmak isterseniz:',
  credit: (link: string) => `Animasyonlu ikonlar: ${link}`,
  noWarranty: 'Garanti yok',
  noWarrantyText: 'İkonlar ve kod, hiçbir türde garanti verilmeksizin “olduğu gibi” sunulur.',
  licenseText: 'Lisans metni',
  bindingNote: 'Aşağıdaki lisans metni orijinal İngilizce sürümdür ve hukuken bağlayıcı olan odur.',
};
