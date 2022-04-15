<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { courses } from '$lib/courses';
	import type { Course } from '$lib/courses';

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const { course: courseName } = params;
		const course = courses.find((it) => it.name == courseName);
		if (!course) {
			return {
				status: 404
			};
		}
		return {
			status: 200,
			props: {
				course
			}
		};
	};
</script>

<script lang="ts">
	import '$lib/styles/global.scss';

	export let course: Course;
	const randomLorem = () => {
		let result = [];
		const lorems = [
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit nemo delectus fugiat, assumenda laborum hic pariatur voluptatum totam ea nesciunt suscipit nostrum rem laudantium magni, quia voluptatem eius, alias facilis.',
			'Nostrum expedita minima delectus quibusdam veritatis? Et deserunt quia qui dolores sapiente perferendis delectus consequuntur? Ut esse libero minus harum eligendi atque sunt exercitationem, at ipsum a molestias distinctio quas.',
			'Qui suscipit officia saepe, amet consectetur atque maiores nam eius inventore dicta officiis, fugiat magnam eligendi earum corrupti rerum sed repellendus a, est doloremque sequi recusandae! Dignissimos magnam voluptatibus maiores.',
			'Dignissimos, porro iusto. Ipsa, neque ratione officiis ad asperiores porro nulla incidunt quos inventore totam tenetur itaque laudantium adipisci! Alias sapiente itaque eligendi, natus blanditiis cum nostrum beatae ab rem?',
			'Totam illo enim, sit veniam quae sunt modi magni in! Mollitia assumenda beatae dolorum ipsa excepturi. Quidem, facere? Nemo obcaecati adipisci tempore laborum facere tenetur omnis praesentium id ducimus mollitia?',
			'Quas obcaecati recusandae similique, quia neque facere, molestias hic minima excepturi asperiores consequuntur nesciunt, porro alias dolorum sunt vero consequatur expedita fugiat aspernatur qui fugit. Distinctio at recusandae laboriosam ullam.',
			'Quibusdam quo, at, ut vel, autem perspiciatis sint nobis alias voluptates quos hic veritatis atque? Earum reiciendis dolorem dignissimos libero neque! Impedit maxime laborum esse distinctio amet atque fuga necessitatibus.',
			'Deleniti consequuntur hic exercitationem velit earum maxime, dolorem beatae cum fugit quo adipisci sint culpa, dolorum fugiat temporibus accusamus officia nulla dignissimos eaque ducimus? Necessitatibus nisi dolorum impedit temporibus expedita.',
			'Similique ipsum repellat architecto earum, laboriosam ipsa magnam delectus ullam corrupti. Vero ipsa provident totam nobis modi necessitatibus quasi animi accusantium, ex magnam tempore odio ullam, id deserunt inventore suscipit?',
			'Animi harum vero adipisci eveniet et, corporis quae exercitationem repellendus, libero suscipit esse nobis unde, voluptatum vitae dolorum reiciendis dolore veritatis beatae ex culpa alias asperiores tempora. Asperiores, modi quisquam?',
			'Assumenda soluta corrupti molestias laborum dolorum, consequuntur architecto nemo dolorem voluptate esse placeat aperiam fugit corporis quia asperiores, incidunt beatae, ipsa cum unde? Reiciendis maxime, qui veritatis fugit quisquam eaque!',
			'Ex deserunt ullam placeat voluptate sunt, repellendus reiciendis dignissimos odio veritatis iusto commodi. Atque architecto assumenda, incidunt laborum est laboriosam animi eos earum officia, repudiandae perspiciatis, minus totam quae facere?',
			'Eligendi repellendus asperiores corrupti consequuntur similique aliquam unde quia nam perspiciatis blanditiis iusto ipsum laborum, velit deserunt veritatis molestias consectetur molestiae quod sunt impedit temporibus? Voluptatibus autem aut nulla quisquam.',
			'Repudiandae, neque similique? Quia deserunt aperiam nemo temporibus inventore sapiente similique quaerat totam labore commodi a non numquam rerum, corporis consequatur facere ex! Ab fugiat aliquam voluptatum similique, accusantium reprehenderit!',
			'Doloribus iure harum, praesentium sequi pariatur ad nam! Enim velit beatae laborum recusandae obcaecati inventore harum, est laboriosam similique soluta cupiditate id corporis quo minima quis rem doloremque, dolores iure.',
			'Eos laboriosam, laudantium molestias in minus ipsa alias aliquam ipsum, nostrum debitis architecto quaerat at dolorum tempore nisi officia fuga earum? Molestias repudiandae, aperiam excepturi culpa deserunt rem nulla dolore.',
			'Qui, rerum eaque quae labore at amet quo laboriosam repudiandae nisi reprehenderit, vero odit magni modi maiores cum ipsum veniam itaque asperiores? Vitae sit ipsa tempore molestias inventore consequatur sequi!',
			'Blanditiis dolore distinctio, laborum velit quidem debitis laboriosam nam quo rem placeat similique sunt vitae officiis soluta dolorum aliquid commodi! Maxime aut vel sequi illo velit debitis quisquam, ex maiores?',
			'Accusamus tenetur, animi debitis inventore tempora repudiandae laborum, porro aliquam hic laudantium maxime quo beatae. Natus sequi tempore iusto voluptates blanditiis, ipsa repellat quos corrupti quae esse sapiente obcaecati odit.',
			'Nostrum iste doloremque neque, nobis animi qui. Deleniti ad fugit non reiciendis provident molestias, omnis ducimus aliquam reprehenderit, nobis asperiores. Maxime quia explicabo impedit ipsum totam aliquid consequuntur odit eos.',
			'Illo eligendi placeat minima debitis consequuntur eveniet sed quasi facilis voluptas, fuga delectus qui. Quia adipisci explicabo nulla voluptatum fugiat. Nam accusantium officiis maxime pariatur nostrum autem corrupti impedit odio?',
			'Vitae eos blanditiis sed tempora similique delectus? Reiciendis nesciunt, enim quaerat molestiae harum eius culpa quibusdam facere pariatur, obcaecati vitae nihil aut exercitationem ipsam! Tenetur ex blanditiis dolorem suscipit quae!',
			'Assumenda repellendus ipsam voluptatem vero, est amet nesciunt necessitatibus hic perferendis nemo esse nisi, dolor minima non quasi asperiores id at? Magni repellat doloribus tempora obcaecati magnam! Magnam, ullam molestiae.',
			'Magnam fugiat expedita perferendis, quisquam nihil ad quidem? Facere natus, ut magni, obcaecati, laudantium dignissimos assumenda sequi accusamus explicabo corrupti alias. Suscipit, quaerat assumenda sapiente atque enim pariatur et praesentium?',
			'Doloribus dolorum ex asperiores temporibus nemo! Omnis magni molestias, ut aspernatur quis dolore saepe minima culpa similique consequuntur corrupti, eaque est officiis aliquam dolor quas, pariatur quibusdam voluptate quos architecto.',
			'Corporis aliquam cupiditate exercitationem incidunt ea voluptatum dignissimos voluptatem fugit, vitae ullam. Iusto, mollitia quas illo, ipsum similique dolor quam magni maxime voluptatum magnam deserunt assumenda iure cum perferendis officiis?',
			'Odit non aliquam praesentium. Ad eos asperiores tempora voluptatibus assumenda distinctio, molestiae impedit dolore est velit sequi voluptate in illo eaque reprehenderit, vero iste aliquid, omnis cupiditate ipsa cum. Natus.',
			'Placeat sunt ut consequatur? Et unde voluptate ducimus quas, a enim, neque mollitia nam temporibus doloremque reprehenderit! Cum a quas minus nihil nemo, sequi voluptates error iste officiis sapiente quibusdam.',
			'Harum facere saepe, mollitia dolor autem vitae, at impedit iste ex qui nesciunt quis eligendi debitis soluta rem praesentium aliquam ipsa a quos est et necessitatibus nihil. Quidem, maxime aliquid.',
			'Iste magni esse doloremque quos vitae, reprehenderit vero perspiciatis laboriosam illo repellat labore similique iusto officiis quasi. Esse reprehenderit maxime voluptatum, in ullam vel. Quo labore sequi quaerat ab nisi!',
			'Totam sed omnis aliquid soluta unde modi, illo quaerat harum, aperiam ab officiis incidunt illum, ratione mollitia expedita! Cumque quo ad ea quam reiciendis voluptatem placeat minus laboriosam commodi voluptas.',
			'Aliquam tempore esse quasi unde incidunt ex dolores repudiandae alias, at nesciunt deserunt nam delectus dolorum. Totam, quasi, nobis quidem nisi quia laboriosam natus nesciunt numquam distinctio rerum sunt inventore?',
			'Est, ipsam. Illum eos officiis eaque molestiae, dolorum, quam veritatis consequuntur vitae, molestias aliquam rerum doloremque perferendis unde reprehenderit laudantium deleniti. Aperiam odit quis provident nostrum consequuntur, ex molestiae iusto?',
			'Commodi nemo aperiam pariatur eius rem laboriosam, optio iusto temporibus dignissimos totam quidem officiis, dolorum voluptatem repudiandae et laudantium. Odit dicta voluptas commodi? Quis possimus molestiae, suscipit quos odit provident.',
			'Possimus eum consequuntur nesciunt sit vel ex accusantium, repudiandae omnis a dolor ratione aliquam odit illum cum doloribus beatae reprehenderit, perferendis in nemo nisi eveniet! Ut quos quidem illum ipsum.',
			'Dignissimos a exercitationem architecto qui consectetur molestias! Reiciendis, maiores voluptate pariatur odio corporis amet dolore. At soluta nisi iure consectetur. Id aspernatur obcaecati, sed vel vero tenetur quam nam error.',
			'Iste reiciendis placeat commodi pariatur tempora nulla aperiam fugiat eum fugit eius, magni error animi in. Tempore consectetur eum veniam hic molestiae quaerat, consequatur tenetur ullam omnis! Dicta, corrupti magnam!',
			'Non corporis voluptatem quod doloribus aliquam, dolorum possimus. Exercitationem tempore delectus minus nihil tenetur explicabo, assumenda repellendus, sed recusandae perferendis reprehenderit, facilis beatae corrupti? Ipsam quasi quae optio tenetur fuga.',
			'Suscipit nemo nam doloremque quis quaerat assumenda deleniti numquam sint sunt quas quia maxime, excepturi animi ea? Facere est fugit esse doloribus temporibus! Expedita velit delectus ipsam! Hic, non explicabo!',
			'Dignissimos corporis reprehenderit eius iusto minus, magnam repudiandae repellendus possimus maxime! Quaerat aut velit soluta! Odit consequuntur incidunt error mollitia iusto nam natus dolor dignissimos ipsam, temporibus ducimus iure cupiditate!',
			'Blanditiis nisi consequatur aliquid eum ea dignissimos quos. Ducimus hic atque voluptatem est veniam illum numquam suscipit labore, ipsa dolorem repellendus eum alias non nemo? Culpa quos velit officiis fuga.',
			'Fuga quos inventore laboriosam, corporis quaerat laudantium suscipit reprehenderit asperiores illo est mollitia. Debitis ratione est doloribus omnis laborum delectus quisquam quis repellat aspernatur, saepe veritatis odio quo at nam.',
			'Incidunt esse dolore neque, dicta repellendus ut vero cumque. Impedit, aliquam asperiores, sint quas optio, non amet aut ut a quod veniam ipsam iure hic! Possimus debitis modi voluptate earum.',
			'Ipsa consequatur, accusantium culpa at exercitationem fugit amet veritatis nulla itaque tempora et est. Facilis voluptatibus placeat quaerat sint consequatur consequuntur praesentium nemo aliquam? Ullam neque ex nihil dolor eos.',
			'Eligendi quos dolor eveniet iusto? Nihil saepe dignissimos iure similique optio voluptatum architecto eos! Velit, est nobis fugiat esse repellat doloribus officia aut voluptas. Magni odio sequi quis reprehenderit ex!',
			'Facere repudiandae soluta dolore optio, exercitationem doloribus, illo, quam cum sequi sunt nemo obcaecati at! Minima, maxime! Ipsam sint quas est. Officiis id ad perferendis a ipsam veniam est nisi.',
			'Aliquid, necessitatibus doloribus eos adipisci consectetur nulla, nisi nesciunt iste culpa vel quae repudiandae? Possimus perspiciatis sed quam? Itaque quam tempore amet corrupti consequuntur accusantium explicabo consequatur, quae quia totam!',
			'Ullam, nulla atque saepe dolorem maiores vel sint obcaecati dolores veritatis omnis quibusdam! Deserunt accusamus, nesciunt, atque odio id saepe amet ipsam excepturi maxime accusantium eligendi, autem corrupti iure veritatis.',
			'Nulla sint praesentium unde magni, cupiditate accusantium quo quis quas veritatis fugit totam aperiam tempore nemo dolores consectetur nesciunt nisi dolore a hic labore sequi debitis tempora quae! Temporibus, quod!',
			'Deserunt a ducimus hic velit magnam molestiae sapiente dolor rem nam consequuntur odit, in et iste perspiciatis? Qui error ducimus assumenda, nostrum quam, quisquam adipisci neque minus dicta voluptatem enim!',
			'Fugit explicabo corporis enim labore repellat quod debitis maiores ipsum et iure ut consectetur culpa quibusdam odit sunt libero, beatae dignissimos. Cumque nulla deleniti ea ex in! Perferendis, repellat suscipit.',
			'Quis quaerat quisquam laborum ipsum illum dolorem est quae! Quod asperiores magnam expedita sit non beatae harum ipsa, ullam delectus quisquam exercitationem reiciendis provident, nemo numquam qui at cum laboriosam.',
			'Dolorem, nesciunt! Praesentium temporibus, repudiandae est voluptates iusto pariatur non, doloribus aliquam ullam facere fugiat veritatis assumenda obcaecati suscipit nulla neque repellendus alias nesciunt ex velit error laborum. Distinctio, nobis.',
			'Maxime neque nihil debitis nulla provident dolorem nesciunt cum corrupti aut quas ullam, officia consequuntur reprehenderit itaque quasi tenetur numquam voluptatibus minus saepe ea veniam, animi dolorum. Illum, aut est!',
			'Quos est impedit facere asperiores animi, non libero qui beatae, adipisci ullam ratione, voluptas repellat dolore harum illo? Perferendis maiores rem vitae optio voluptatem nam enim nobis natus voluptatum ipsum.',
			'Ipsum, quo vero nemo illum corrupti doloremque aperiam excepturi ut suscipit explicabo molestiae in, nulla dolorem. Debitis, harum vitae. Quae veritatis, dolor quis corrupti laudantium ducimus facere? Illo, modi omnis.',
			'In perspiciatis, exercitationem, porro ipsam voluptate beatae iste magni illo nam voluptatem accusantium eligendi asperiores consequatur? Optio fuga exercitationem, modi, corporis minus deleniti eum esse, similique itaque est quas? Cumque?',
			'Eos consectetur maiores inventore excepturi, recusandae totam distinctio non aliquid deleniti laborum qui voluptate numquam ad! Similique beatae vel necessitatibus quis, dolorum iusto, minima voluptas reprehenderit aspernatur dicta hic sunt.',
			'Magnam velit eveniet adipisci dignissimos? Qui sunt beatae obcaecati. Culpa officia consequuntur praesentium laudantium placeat, atque eos repellendus animi iusto natus numquam impedit sapiente, temporibus odit repellat labore qui quis.',
			'Doloremque temporibus provident, repellat officiis odio ipsum alias a assumenda voluptas, incidunt ea. Aut ipsam similique quas veritatis qui? Explicabo, saepe harum? Recusandae numquam fugit voluptas perferendis cum et facilis.',
			'Officia vero, non consequuntur possimus pariatur natus ea expedita error quia velit mollitia, ipsum tempore ad vel molestias nesciunt beatae, laborum eos. Perferendis quisquam illum tenetur corporis. Culpa, nihil odit.',
			'Tempore expedita impedit harum vitae vel nihil perspiciatis nostrum ex odio! Omnis atque voluptate minus quo velit! Quod minus eaque voluptas? Eligendi rem ratione, recusandae consequatur minima quo obcaecati tenetur.',
			'Aperiam consequatur aliquid quibusdam earum officia voluptas unde, impedit, nulla necessitatibus reiciendis odio? Adipisci quis nemo culpa laudantium! Aliquid, repellendus. Consequatur harum ipsa odit! Quod iste sit distinctio ducimus ipsa?',
			'Quibusdam alias minus necessitatibus reprehenderit sunt ducimus nobis doloremque veritatis ut consequatur obcaecati voluptatibus sint nesciunt, velit at voluptates deserunt magnam aliquid numquam nemo. Itaque possimus reiciendis hic quos. Inventore.',
			'Officiis, atque aspernatur alias accusamus hic cum praesentium placeat eveniet nobis reprehenderit tenetur magni dicta. Consequatur ipsam voluptas ullam reprehenderit facere minima officia velit, eius, possimus sapiente, quasi itaque excepturi?',
			'Nobis a officia laborum accusamus blanditiis quos distinctio. Doloremque velit, esse ipsum nam nesciunt minus fugit facilis, nobis earum accusantium eligendi culpa quo assumenda commodi veritatis provident nemo eaque. Incidunt.',
			'Sunt maiores laboriosam officiis dolore iste quasi repudiandae, itaque asperiores, aperiam aspernatur maxime blanditiis. A assumenda nesciunt velit minus, tempora sapiente quia itaque minima asperiores, iste iusto reiciendis eveniet deleniti!',
			'Aperiam excepturi facere perferendis enim consequatur eaque libero et. Recusandae veniam voluptates accusamus quasi officia, aspernatur inventore pariatur distinctio aperiam ratione magni! Ut necessitatibus commodi odit ipsa, ex at pariatur?',
			'Velit itaque nam illum quos consectetur repellendus nostrum earum placeat voluptate doloribus! Provident explicabo ad reprehenderit ex quidem minus, quibusdam ipsum? Doloremque natus ratione repellat in consectetur. Ipsum, sapiente fugiat.',
			'Cumque quod eos sit eaque unde, deleniti molestiae, explicabo fugit a numquam quisquam voluptates similique est. Ipsum, deserunt suscipit, nesciunt tenetur praesentium incidunt perferendis corporis mollitia quia consequatur pariatur porro.',
			'Esse perferendis consectetur veritatis rem necessitatibus eaque nihil veniam suscipit reiciendis reprehenderit similique ipsa beatae numquam modi accusamus animi vero hic, aliquam sunt blanditiis provident magni! Dolores laudantium tempora ipsum.',
			'Est sequi eius quisquam adipisci tempore? Expedita deleniti sapiente magnam architecto sequi nostrum mollitia, a recusandae inventore minima harum labore dolorem repellendus id rem aperiam vero distinctio modi aliquam animi?',
			'Omnis inventore ducimus sed, rem sunt ullam eius in similique deleniti quis quae laborum necessitatibus officiis eligendi suscipit optio perspiciatis modi sequi rerum libero ut enim ea? Officia, alias saepe!',
			'Reprehenderit totam hic numquam provident cupiditate eos nobis! Dolorum perferendis minus error repellendus! Quia nisi eius cupiditate ipsum corrupti aperiam a est asperiores rem, rerum obcaecati eum. Dolores, eos expedita.',
			'At, perspiciatis dolorem, voluptatum atque alias cum unde ea facilis ducimus laboriosam odit, ipsum eveniet asperiores iste repudiandae dolorum aliquam. Repellat cum, architecto ex harum optio consectetur natus temporibus veniam.',
			'Molestias hic recusandae veritatis, accusantium, obcaecati laboriosam adipisci id ducimus officiis voluptate ea repellendus ullam in tempore at ipsam modi odit sapiente ipsa quibusdam rerum porro. Quaerat aliquid facere iste.',
			'Distinctio nobis, quisquam deserunt minima odit hic tenetur sint quas. Velit voluptatum inventore, atque dolor, odit beatae recusandae natus repellendus nobis quod a ea incidunt in nisi doloremque provident sint.',
			'Nostrum possimus magnam quis, qui praesentium aliquam, ad laboriosam ipsam odio laborum asperiores ab at quasi provident voluptate earum vel harum illum? Et id, laudantium quae vel blanditiis quis saepe.',
			'Non quia voluptatibus, aperiam sapiente suscipit atque. Provident consequatur perspiciatis animi itaque. Omnis animi corporis quae est, ad corrupti soluta fugit, culpa non, iure aspernatur debitis totam provident vitae nesciunt.',
			'Provident veritatis illum facere nostrum quos assumenda! A, eveniet dolorem sed sit sunt ad labore ducimus repellat totam nesciunt corporis, dignissimos dolor praesentium ratione voluptates enim illum illo deserunt cupiditate!',
			'Officia, voluptatibus facilis. Temporibus reiciendis accusamus laudantium qui, labore cumque doloribus, molestias ipsa ex quisquam tempora repudiandae omnis dolor totam rem sint accusantium atque enim, quo est obcaecati facere ad!',
			'In vitae dicta eos aperiam numquam quasi quibusdam repellendus voluptates! Aut voluptas in quaerat ab temporibus eveniet voluptatibus provident, repellat iste blanditiis tempore, esse est sapiente harum corrupti incidunt asperiores?',
			'Consequuntur quibusdam reiciendis doloribus in autem voluptate, accusantium aut nam debitis quod non iure ab. Debitis voluptatum aut suscipit et corporis quae, vel minus sequi optio voluptate iure nemo soluta.',
			'Eum provident nemo similique quisquam unde, in totam facilis, adipisci praesentium eveniet esse delectus nisi voluptatum quidem earum omnis deserunt eligendi id quaerat minima. Modi accusantium sequi iste pariatur. Vitae!',
			'Impedit dolorem optio numquam itaque deleniti dolore, animi voluptatem debitis cumque culpa ut corporis, odio natus quas aspernatur id sed necessitatibus possimus, nulla hic quos sapiente reprehenderit eligendi? Commodi, cum.',
			'Quam saepe nulla exercitationem ad natus libero id in autem, labore totam. Aperiam, iste sit corporis, esse nostrum laboriosam vero quo consectetur dolor, magni fuga eius in minima id tempore.',
			'Hic, inventore. Autem distinctio ducimus a deserunt dolorum, quo architecto, nemo, praesentium illo debitis expedita. Laudantium vitae facilis dolorem. Fuga, accusantium vel esse ipsam quidem dolorum laborum porro optio rem?',
			'Odit facere perferendis architecto id accusamus, harum eveniet dolore incidunt, veritatis quod, deleniti itaque nostrum tempora totam magni eum sequi voluptatum iste! Vero corrupti blanditiis deserunt quas praesentium illum porro!',
			'Sunt magni porro, modi ullam nostrum error necessitatibus repellendus obcaecati quis saepe excepturi, et nulla, pariatur cumque molestiae fuga cupiditate doloribus aut? Minima nulla distinctio, error voluptas odit earum? Impedit.',
			'Id harum, excepturi delectus magnam, quas iure culpa ducimus, enim dolores cum cumque. Non enim quasi quas explicabo ex. Deserunt reprehenderit reiciendis explicabo eum quasi nostrum iusto ratione! Fugiat, nam.',
			'Voluptatum expedita repellendus non corrupti repudiandae nihil ipsam aliquam accusantium totam, officia ad inventore iure veritatis suscipit soluta necessitatibus aliquid dolores officiis ipsa iusto alias! Blanditiis quas quam aliquam facere.',
			'Repellendus libero debitis ex at eveniet! Perferendis earum ea debitis sequi sapiente cumque assumenda dolorum quo natus sed quam repudiandae pariatur, explicabo unde rem repellat qui necessitatibus. Quisquam, praesentium. Fuga?',
			'Cumque, magni. Iure tenetur sed officia! Quam minima exercitationem et corrupti maxime nostrum blanditiis vel illo pariatur, totam quis veniam repellat, perferendis deleniti quas! Officia totam delectus iure adipisci nisi?',
			'Eveniet hic dolores a harum architecto odio neque sed rerum id! Doloribus recusandae reprehenderit, illo, sed alias fugiat exercitationem obcaecati dignissimos fuga quisquam, distinctio sequi harum maiores quo ea vel?',
			'Iure impedit nisi atque dolore aliquid veritatis maiores facere. Itaque necessitatibus praesentium totam beatae cumque? Sapiente perferendis a nobis qui quo? Assumenda voluptatem natus aperiam minus perspiciatis pariatur alias consectetur?',
			'Cum impedit neque quae maxime architecto commodi ducimus est ex enim quibusdam, praesentium delectus, illum, eveniet quas! Distinctio dignissimos nobis voluptates porro quod ex beatae, veritatis molestias, inventore nisi veniam.',
			'Nihil ea eveniet animi dolores ratione, incidunt iure repellendus error, veritatis cupiditate quisquam rerum itaque enim! Reiciendis commodi, odit atque, esse quam nisi culpa, quia quod facilis ipsa ut maiores?',
			'Ipsum repudiandae quas aliquid totam culpa voluptatibus commodi, perspiciatis velit sunt accusamus animi at omnis quisquam tempora repellendus? Culpa magni accusantium quae. Mollitia deserunt voluptas nisi! Ad hic accusamus nulla?',
			'Error asperiores obcaecati voluptas quaerat rem tenetur perferendis soluta porro, nulla laudantium. Cum, aliquam delectus! Consequuntur laborum perferendis ex cupiditate voluptatum eaque natus unde explicabo quo itaque! Assumenda, quasi unde.',
			'Velit impedit et rem provident saepe praesentium eaque, laborum sit dolores corporis animi iste corrupti fugiat ratione repudiandae. Accusamus ad perspiciatis non dolorem odit nesciunt, similique quaerat nobis maxime ratione?'
		];
		for (let i = 0; i < 3; i++) result.push(lorems[Math.floor(Math.random() * lorems.length)]);
		return result;
	};

	const theLorem = randomLorem();
</script>

<div class="header" style="background-color: {course.color}">
	<h1>{course.prettyName}</h1>
</div>
<div class="content">
	<h1>Welcome to {course.prettyName}!</h1>
	<p>
		This is the page for all things {course.prettyName}. {theLorem}
	</p>
</div>

<style lang="scss">
	.header {
		h1 {
			margin: 0;
			margin-top: 50px;
			@media (max-width: 900px) {
				margin-top: 0;
			}
		}
		padding: 30px;
		padding-bottom: 50px;
		color: white;
	}

	.content {
		padding: 30px;
	}
</style>
