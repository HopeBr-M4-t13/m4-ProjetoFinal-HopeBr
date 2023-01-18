import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Donation } from "../../entities/donation.entity";
import { Image } from "../../entities/image.entity";
import AppError from "../../errors/AppError";

const updateDonationService = async (data, paramsId: string) => {
	const donationsRep = AppDataSource.getRepository(Donation);
	const imagesRep = AppDataSource.getRepository(Image);
	const categoryRep = AppDataSource.getRepository(Category);

	const findDonation = await donationsRep.findOne({
		where: { id: paramsId },
		relations: { image: true, category: true },
	});

	if (data.image) {
		const findImage = await imagesRep.findOne({
			where: { id: findDonation.image?.id },
		});
		if (findImage) {
			const updateImage = imagesRep.create({
				...findImage,
				imageUrl: data.image,
			});
			await imagesRep.save(updateImage);
			data.image = updateImage;
		} else {
			const newImage = imagesRep.create({ imageUrl: data.image });
			await imagesRep.save(newImage);
			data.image = newImage;
		}
	}

	if (data.category) {
		const findCategory = await categoryRep.findOne({
			where: { id: data.category },
		});
		if (!findCategory) {
			throw new AppError("Invalid category", 400);
		}
		data.category = findCategory;
	}

	const donationUpdate = donationsRep.create({
		...findDonation,
		...data,
	});
	await donationsRep.save(donationUpdate);

	return donationUpdate;
};

export default updateDonationService;
