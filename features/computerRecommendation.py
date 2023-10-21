from flask import Blueprint, jsonify, request
from pgmpy.models import BayesianNetwork
from pgmpy.inference import VariableElimination

ComputerRecommendation = Blueprint('recommendation', __name__)

model = BayesianNetwork.load('./model/compiled-model.bif')
inference_model = VariableElimination(model)
inference_variables = ['Chosen_CPU', 'CPU_Usage', 'Chosen_RAM', 'RAM_Usage', 'GPU_Usage', 'Chosen_GPU']


@ComputerRecommendation.route('/', methods=['POST'])
def index():
    data = request.json
    usage = data['usage']

    evidence_values = {'Usage': usage}

    if ('price' in data):
        evidence_values['Price'] = data['price']

    query = inference_model.map_query(variables=inference_variables, evidence=evidence_values)

    return jsonify(query)