import {GraphNode} from '@src/Tools/Production/Result/Nodes/GraphNode';
import {IVisNode} from '@src/Tools/Production/Result/IVisNode';
import {ResourceAmount} from '@src/Tools/Production/Result/ResourceAmount';
import {IItemSchema} from '@src/Schema/IItemSchema';
import {IItemAmountSchema} from '@src/Schema/IItemAmountSchema';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {Strings} from '@src/Utils/Strings';

export class ByproductNode extends GraphNode
{

	public readonly resource: IItemSchema;
	public readonly inputs: ResourceAmount[];

	public constructor(public readonly itemAmount: IItemAmountSchema, data: IJsonSchema)
	{
		super();
		this.resource = data.items[itemAmount.item];
		this.inputs = [new ResourceAmount(this.resource, itemAmount.amount, 0)];
	}

	public getInputs(): ResourceAmount[]
	{
		return this.inputs;
	}

	public getOutputs(): ResourceAmount[]
	{
		return [];
	}

	public getVisNode(): IVisNode
	{
		return {
			id: this.id,
			label: this.getLabel(),
			color: {
				border: 'rgba(0, 0, 0, 0)',
				background: 'rgba(27, 112, 137, 1)',
				highlight: {
					border: 'rgba(238, 238, 238, 1)',
					background: 'rgba(38, 159, 194, 1)',
				},
			},
			font: {
				color: 'rgba(238, 238, 238, 1)',
			},
		};
	}

	private getLabel(): string
	{
		return this.formatText('Byproduct: ' + this.resource.name) + '\n' + Strings.formatNumber(this.itemAmount.amount) + ' / min';
	}

}
